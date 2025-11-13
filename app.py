from flask import Flask, render_template_string, request

app = Flask(__name__)

# --- QUIZ DATA ---
questions = [
    {"no": 1, "question": "Python was created by Guido van Rossum.", "answer": "Fact"},
    {"no": 2, "question": "Python code must always be compiled before running.", "answer": "Bluff"},
    {"no": 3, "question": "Indentation is important in Python syntax.", "answer": "Fact"},
    {"no": 4, "question": "Python cannot be used for web development.", "answer": "Bluff"},
    {"no": 5, "question": "Variables in Python do not need explicit declaration.", "answer": "Fact"}
]

# --- HTML TEMPLATE ---
quiz_template = """
<!DOCTYPE html>
<html>
<head>
    <title>Python Exam - Fact or Bluff</title>
    <style>
        body { font-family: Arial; background: #f0f4f8; text-align: center; padding: 30px; }
        h1 { color: #333; }
        form { display: inline-block; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px #ccc; }
        .question { margin: 15px 0; font-size: 18px; }
        input[type=submit] { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
        input[type=submit]:hover { background: #0056b3; }
    </style>
</head>
<body>
    <h1>Python Exam: Fact or Bluff</h1>
    <form method="post" action="/result">
        {% for q in questions %}
            <div class="question">
                <b>Question {{ q.no }}:</b> {{ q.question }}<br>
                <input type="radio" name="q{{ q.no }}" value="Fact" required> Fact
                <input type="radio" name="q{{ q.no }}" value="Bluff"> Bluff
            </div>
        {% endfor %}
        <input type="submit" value="Submit Answers">
    </form>
</body>
</html>
"""

# --- RESULT TEMPLATE ---
result_template = """
<!DOCTYPE html>
<html>
<head>
    <title>Result - Python Exam</title>
    <style>
        body { font-family: Arial; background: #eef3f9; text-align: center; padding: 30px; }
        h1 { color: #333; }
        .score { font-size: 22px; color: green; }
        .back { margin-top: 20px; display: inline-block; background: #007bff; color: white;
                padding: 10px 20px; border-radius: 5px; text-decoration: none; }
        .back:hover { background: #0056b3; }
    </style>
</head>
<body>
    <h1>Exam Result</h1>
    <p class="score">Your Score: {{ score }}/{{ total }}</p>
    <p>{{ message }}</p>
    <a href="/" class="back">Try Again</a>
</body>
</html>
"""

@app.route('/')
def home():
    return render_template_string(quiz_template, questions=questions)

@app.route('/result', methods=['POST'])
def result():
    score = 0
    for q in questions:
        user_answer = request.form.get(f"q{q['no']}")
        if user_answer == q['answer']:
            score += 1

    message = "Excellent! 🏆" if score == 5 else "Good try! Keep practicing Python."
    return render_template_string(result_template, score=score, total=len(questions), message=message)

if __name__ == '__main__':
    app.run(debug=True)
    