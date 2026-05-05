from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return "API Running 🚀"

@app.route("/api", methods=["POST"])
def api():
    data = request.json
    # 👇 future logic goes here
    return jsonify({
        "message": "Working",
        "data": data
    })

if __name__ == "__main__":
    app.run()
