from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
# habilita CORS para o Frontend React consumir a API 
CORS(app) 

# carregar modelo e scaler treinados
try:
    model = joblib.load('house_model.pkl')
    scaler = joblib.load('scaler.pkl')
    print("Modelo carregado com sucesso.")
except:
    print("Erro: Execute model_train.py primeiro para gerar o modelo.")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'online', 'model': 'LinearRegression'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # extração das features
        features = [
            float(data['area']),
            float(data['quartos']),
            float(data['banheiros']),
            float(data['idade']),
            float(data['distancia'])
        ]
        
        # Ccnverter para array 2D e normalizar (Obrigatório pois o treino foi normalizado)
        features_array = np.array([features])
        features_scaled = scaler.transform(features_array)
        
        # predição
        prediction = model.predict(features_scaled)[0]
        
        # retorno formatado
        return jsonify({
            'preco_estimado': round(prediction, 2),
            'moeda': 'BRL',
            'input_recebido': data
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)