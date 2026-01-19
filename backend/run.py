from backend.app import create_app

app = create_app()

if __name__ == "__main__":
    # Debug=True is for development only. Remove or set to False for production.
    app.run(debug=True)