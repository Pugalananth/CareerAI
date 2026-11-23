from flask import Blueprint, request, jsonify
from google import genai
import os

chatbot = Blueprint("chatbot", __name__)

api_key = os.getenv("GEMINI_API_KEY")

print("API KEY:", api_key)

client = genai.Client(api_key=api_key)

# ✅ PROPER FORMATTER (DO NOT OVER-MANIPULATE TEXT)
def format_response(text: str) -> str:
    if not text:
        return "No response generated."

    # Only normalize spacing (SAFE METHOD)
    text = text.replace("\r\n", "\n")  # Windows fix
    text = text.strip()

    return text


@chatbot.route("/chat", methods=["POST"])
def chat():

    try:
        data = request.json or {}
        prompt = data.get("message", "").strip()

        if not prompt:
            return jsonify({
                "reply": "Please enter a valid question."
            })

        system_prompt = f"""
You are an elite AI Career Coach and Industry Expert.

User Question:
{prompt}

STRICT INSTRUCTIONS:
- Use clear headings
- Use bullet points
- Always give step-by-step roadmap if needed
- Include skills, tools, projects
- Include job roles
- Include salary in India if relevant
- Keep response structured and readable
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=system_prompt
        )

        return jsonify({
            "reply": format_response(response.text)
        })

    except Exception as e:
        print("GEMINI ERROR =", e)

        return jsonify({
            "reply": f"Something went wrong: {str(e)}"
        })