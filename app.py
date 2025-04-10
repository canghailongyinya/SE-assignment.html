from flask import Flask, send_from_directory

app = Flask(__name__)

# 路由到主页
@app.route('/')
def index():
    return send_from_directory('.', 'students.html')

# 路由到静态文件（如 JavaScript 和 CSS）
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)