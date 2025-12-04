import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
import joblib

# 500 amostras e 5 features 
np.random.seed(42)
n_samples = 500

data = {
    'area': np.random.randint(50, 300, n_samples),          # 50 a 300 m²
    'quartos': np.random.randint(1, 6, n_samples),          # 1 a 5 quartos
    'banheiros': np.random.randint(1, 5, n_samples),        # 1 a 4 banheiros
    'idade': np.random.randint(0, 50, n_samples),           # 0 a 50 anos
    'distancia': np.random.uniform(1, 30, n_samples)        # 1 a 30 km
}

df = pd.DataFrame(data)

# Fórmula base: 
# Preço base + (Area*5k) + (Quartos*49k) + (Banheiros*29k) - (Idade*2k) - (Distancia*4.8k)
preco_base = 200000
ruido = np.random.normal(0, 25000, n_samples) # Ruído padrão

df['preco'] = (
    preco_base + 
    (df['area'] * 5000) + 
    (df['quartos'] * 49000) + 
    (df['banheiros'] * 29000) - 
    (df['idade'] * 2000) - 
    (df['distancia'] * 4800) + 
    ruido
)

# divisão e normalização 
X = df[['area', 'quartos', 'banheiros', 'idade', 'distancia']]
y = df['preco']

# divisão 80/20
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Normalização (StandardScaler é crucial para convergência e performance) 
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Treinamento (Regressão Linear)
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Avaliação
y_pred = model.predict(X_test_scaled)

r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
mae = mean_absolute_error(y_test, y_pred)

print(f"--- Resultados do Treinamento ---")
print(f"R² Score: {r2:.4f} (Esperado > 0.95) ")
print(f"RMSE: R$ {rmse:.2f}")
print(f"MAE: R$ {mae:.2f}")

# salvar modelo e scaler para a API
joblib.dump(model, 'house_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
print("\nModelo e Scaler salvos com sucesso!")