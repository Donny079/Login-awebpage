from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import os

app = Flask(__name__, template_folder="templates", static_folder="static")

# NOTE: In production use a secure, environment-derived secret key
app.secret_key = os.environ.get('FLASK_SECRET', 'dev-secret-change-me')

# Demo credentials (also stored client-side in JS for demonstration)
DEMO_EMAIL = "test@example.com"
DEMO_PASSWORD = "1234"


@app.route('/')
def index():
    # If already logged in, go to dashboard
    if session.get('user_email'):
        return redirect(url_for('dashboard'))
    return render_template('index.html')


@app.route('/dashboard')
def dashboard():
    user_email = session.get('user_email')
    if not user_email:
        return redirect(url_for('index'))
    return render_template('dashboard.html', user_email=user_email)


@app.route('/api/login', methods=['POST'])
def api_login():
    """API endpoint: accepts JSON or form data and returns JSON result.

    On successful authentication the user's email is stored in the session.
    """
    data = request.get_json(silent=True) or request.form
    email = (data.get('email') or '').strip()
    password = (data.get('password') or '').strip()

    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password required.'}), 400

    if email == DEMO_EMAIL and password == DEMO_PASSWORD:
        session['user_email'] = email
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401


@app.route('/logout')
def logout():
    session.pop('user_email', None)
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)