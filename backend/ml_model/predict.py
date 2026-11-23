import pickle

# LOAD MODEL

model = pickle.load(

    open("rfweights.pkl","rb")
)

# SAMPLE INPUT

sample = [[1,1,0]]

# PREDICT

prediction = model.predict(sample)

print(

    "Predicted Career:",

    prediction[0]
)