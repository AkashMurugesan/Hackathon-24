import pandas as pd

from langchain.prompts import PromptTemplate
from langchain.llms import CTransformers
from flask import Flask, jsonify, request 
# creating a Flask app 
app = Flask(__name__) 

## Function To get response from LLAma 2 model

def getLLamaresponse(input_json):

    ### LLama2 model
    llm=CTransformers(model='models/llama-2-7b-chat.ggmlv3.q8_0.bin',
                      model_type='llama',
                      config={'max_new_tokens':256,
                              'temperature':0.01})
    
    ## Prompt Template
    template = """There are table data columns from data base: {input_json}. can you give use me some different graph with the dataset to understand the dataset better. can you make the result to be array of object in json (fields in JSON tilte, x field name, y field name, chartType) format."""
    
    prompt=PromptTemplate(input_variables=["input_json"],
                          template=template)
    
    ## Generate the ressponse from the LLama 2 model
    response=llm(prompt.format(input_json=input_json))
    print(response)
    return response

@app.route('/dashboard', methods = ['GET']) 
def dashboard(): 
    data = pd.read_csv('../../results.csv')
    df = pd.DataFrame(data)
    return jsonify(getLLamaresponse(str(df.columns)))
  
  
# driver function 
if __name__ == '__main__': 
  
    app.run(debug = True) 
    
