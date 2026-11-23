import pandas as pd

from sklearn.ensemble import RandomForestClassifier

from sklearn.model_selection import train_test_split

from sklearn.metrics import accuracy_score

import pickle

# SAMPLE DATASET

data = {

    "Python":[1,1,0,0],

    "ML":[1,0,0,1],

    "Web":[0,1,1,0],

    "Career":[
        "AI Engineer",
        "Full Stack Developer",
        "Frontend Developer",
        "Data Scientist"
    ]
}

df = pd.DataFrame(data)

X = df[["Python","ML","Web"]]

y = df["Career"]

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,
    test_size=0.2,
    random_state=42
)

# MODEL

model = RandomForestClassifier()

model.fit(X_train, y_train)

# PREDICTION

prediction = model.predict(X_test)

# ACCURACY

accuracy = accuracy_score(y_test, prediction)

print("Model Accuracy:", accuracy)

# SAVE MODEL

pickle.dump(

    model,

    open("rfweights.pkl","wb")
)

print("Model Saved Successfully")