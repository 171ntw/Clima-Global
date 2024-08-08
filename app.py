from flask import Flask, render_template, request
import requests

app = Flask(__name__)

# Substitua pela sua chave da API
API_KEY = ''

@app.route('/', methods=['GET', 'POST'])
def index():
    weather = None
    if request.method == 'POST':
        city = request.form['city']
        url = f'http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={city}'
        response = requests.get(url)
        try:
            data = response.json()
            weather = {
                'location': data.get('location', {}),
                'temp_c': data.get('current', {}).get('temp_c'),
                'condition': data.get('current', {}).get('condition', {}),
                'humidity': data.get('current', {}).get('humidity'),
                'pressure_mb': data.get('current', {}).get('pressure_mb')
            }
        except ValueError:
            weather = {'error': 'Não foi possível recuperar os dados'}
    
    return render_template('index.html', weather=weather)

if __name__ == '__main__':
    app.run(debug=True)
