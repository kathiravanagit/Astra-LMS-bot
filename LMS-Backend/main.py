import os
from dotenv import load_dotenv
import google.genai as genai
from google.genai import types

from flask import Flask, request, jsonify
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# Set your API key from the environment variable 'API_KEY'
api_key = os.environ.get("API_KEY")
if not api_key:
    raise RuntimeError("API_KEY environment variable not set. Please set API_KEY to your Google GenAI API key.")

Client = genai.Client(api_key=api_key)

# Define the model
model = "models/gemini-2.5-flash"

# Initial system/persona setup
initial_prompt = types.Content(
    role="user",
    parts=[
        types.Part.from_text(text="""Astra is a friendly 24/7 LMS chatbot that helps learners with courses, programming, math, and platform support.
She understands the user’s language and replies in the same way.
Astra only handles LMS and learning-related queries and politely redirects anything outside that scope."""),
    ]
)

model_response = types.Content(
    role="model",
    parts=[
        types.Part.from_text(text="""Understood. I'm Astra, your LMS assistant. 
I’ll reply briefly and in the appropriate language. Let's begin!""")
    ]
)

# Start conversation
def start_chat(user_qn):
    if not user_qn:
        return "Please ask a question."

    contents = [
        initial_prompt,
        model_response,
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=user_qn)],
        ),
    ]

    try:
        full_response = ""
        for chunk in Client.models.generate_content_stream(
            model=model,
            contents=contents,
        ):
            if chunk.text:
                full_response += chunk.text

        return full_response.strip()

    except Exception as e:
        return f"Error: {str(e)}"


# Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://astrabot12.vercel.app", "http://localhost:5173", "http://localhost:5174", "https://your-railway-app-url"]}})

@app.route("/")
def home():
    return jsonify({
        "status": "Astra LMS Bot is running",
        "usage": "POST /bot with { message: 'your question' }"
    })

@app.route("/bot", methods=["POST"])
def chatbot():
    data = request.get_json()
    user_message = data.get("message", "")
    reply = start_chat(user_message)
    return jsonify({"reply": reply})


# Railway-ready runner
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
