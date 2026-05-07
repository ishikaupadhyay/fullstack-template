import base64
import binascii
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

app = Flask(__name__)
CORS(app)

# Constants
USER_ID = "ishika_upadhyay_13082005"
EMAIL = "ishikaupadhyay230142@acropolis.in"
ROLL_NUMBER = "0827CD231039"

def is_prime(n):
    """Checks if a number is prime."""
    try:
        num = int(n)
        if num < 2:
            return False
        for i in range(2, int(num**0.5) + 1):
            if num % i == 0:
                return False
        return True
    except (ValueError, TypeError):
        return False

def get_file_metadata(file_b64):
    """Extracts metadata from a base64 encoded file string."""
    if not file_b64:
        return False, None, None
    
    try:
        # Handle optional Data URI header
        actual_b64 = file_b64
        mime_type = "application/octet-stream"
        
        if "," in file_b64:
            parts = file_b64.split(",", 1)
            header = parts[0]
            actual_b64 = parts[1]
            mime_match = re.search(r'data:(.*?);base64', header)
            if mime_match:
                mime_type = mime_match.group(1)

        # Decode to check validity and calculate size
        decoded_data = base64.b64decode(actual_b64)
        file_size_kb = round(len(decoded_data) / 1024, 2)
        
        # Heuristic for common MIME types if generic
        if mime_type == "application/octet-stream":
            if actual_b64.startswith('/9j/'): mime_type = "image/jpeg"
            elif actual_b64.startswith('iVBORw0KGgo'): mime_type = "image/png"
            elif actual_b64.startswith('JVBERi0'): mime_type = "application/pdf"

        return True, mime_type, file_size_kb
    except (binascii.Error, TypeError, ValueError):
        return False, None, None

@app.route("/bfhl", methods=["GET"])
def bfhl_get():
    """Returns operation code for the challenge."""
    return jsonify({"operation_code": 1}), 200

@app.route("/bfhl", methods=["POST"])
def bfhl_post():
    """Processes input data and optional file for the challenge."""
    try:
        body = request.get_json(silent=True)
        if body is None:
             return jsonify({"is_success": False, "message": "Invalid JSON format"}), 400
             
        if "data" not in body:
            return jsonify({"is_success": False, "message": "Missing 'data' field"}), 400

        data = body.get("data", [])
        file_b64 = body.get("file_b64", None)

        if not isinstance(data, list):
            return jsonify({"is_success": False, "message": "'data' must be an array"}), 400

        # Separate numbers and alphabets
        numbers = [str(item) for item in data if str(item).isdigit()]
        alphabets = [str(item) for item in data if str(item).isalpha() and len(str(item)) == 1]

        # Highest lowercase alphabet
        lowercase_chars = [c for c in alphabets if c.islower()]
        highest_lowercase = [max(lowercase_chars)] if lowercase_chars else []

        # Prime detection
        is_prime_found = any(is_prime(n) for n in numbers)

        # File validation
        file_valid, mime_type, size_kb = get_file_metadata(file_b64)

        return jsonify({
            "is_success": True,
            "user_id": USER_ID,
            "email": EMAIL,
            "roll_number": ROLL_NUMBER,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": highest_lowercase,
            "is_prime_found": is_prime_found,
            "file_valid": file_valid,
            "file_mime_type": mime_type,
            "file_size_kb": size_kb
        }), 200

    except HTTPException as e:
        return jsonify({"is_success": False, "message": str(e)}), e.code
    except Exception as e:
        return jsonify({"is_success": False, "message": str(e)}), 500

@app.route("/", methods=["GET"])
def home():
    return "BFHL API is Running - v2"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
