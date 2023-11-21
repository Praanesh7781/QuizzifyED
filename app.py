# Import necessary libraries
from flask import Flask, render_template, jsonify
import pandas as pd
import webbrowser

app = Flask(__name__)
app.static_folder = "style1.css"

# ... Other routes ...

@app.route('/')
def index():
    return render_template('index.html')

# Route for the main quiz page
@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

# Route for recommendations page
@app.route('/recommendations.html')
def recommendations():
    return render_template('recommendations.html')

# Route for getting recommendations
@app.route('/get_recommendations')
def get_recommendations():
    # Load the quiz dataset from CSV
    quiz_data = pd.read_csv('P:/database/quiz.csv')

    # Load the course dataset from CSV
    course_data = pd.read_csv('P:/database/udacityde.csv')

    # Choose the last user in the quiz dataset
    last_user_id = quiz_data['User ID'].max()
    user_quiz_data = quiz_data[quiz_data['User ID'] == last_user_id]

    # Merge quiz data with course data based on Domain
    merged_data = pd.merge(user_quiz_data, course_data, how='inner', on='Domain')

    # Filter courses based on mapped difficulty level and quiz scores
    filtered_courses = merged_data[
        merged_data['Difficulty Level'].notna() &  # Exclude rows with NaN in 'Difficulty Level'
        merged_data['Quiz Scores'].notna() &  # Exclude rows with NaN in 'Quiz Scores'
        merged_data.apply(lambda row: difficulty_mapping[row['Difficulty Level']](row['Quiz Scores']), axis=1)
    ]

    # Get relevant domains for the user
    relevant_domains = filtered_courses['Domain'].unique()

    # Recommend courses from relevant domains
    recommended_courses = course_data[course_data['Domain'].isin(relevant_domains)]

    # Return the recommendations as JSON
    recommendations_json = recommended_courses[['Name', 'Link']].to_dict(orient='records')
    return jsonify(recommendations_json)

if __name__ == '__main__':
    webbrowser.open('http://127.0.0.1:5000/')
    app.run(debug=True)

