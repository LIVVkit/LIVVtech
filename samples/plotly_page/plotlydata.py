# Get this figure: fig = py.get_figure("https://plot.ly/~jackp/3880/")
# Get this figure's data: data = py.get_figure("https://plot.ly/~jackp/3880/").get_data()
# Add data to this figure: py.plot(Data([Scatter(x=[1, 2], y=[2, 3])]), filename ="2dhistogram-contour-subplots", fileopt="extend"))
# Get y data of first trace: y1 = py.get_figure("https://plot.ly/~jackp/3880/").get_data()[0]["y"]

# Get figure documentation: https://plot.ly/python/get-requests/
# Add data documentation: https://plot.ly/python/file-options/

# You can reproduce this figure in Python with the following code!

# Learn about API authentication here: https://plot.ly/python/getting-started
# Find your api_key here: https://plot.ly/settings/api

import os
import numpy as np
from plotly import tools
import plotly.plotly as py
import plotly.graph_objs as go
import json
from netCDF4 import Dataset

dataset = Dataset('data/ismip.nc', 'r').variables
thk = dataset['thk'][0].tolist()
y_max = np.amax(thk)
y_min = np.amin(thk)


thickness = go.Contour(
    z=thk,
    colorbar=dict(
        thickness=25,
        thicknessmode='pixels',
        len=0.8,
        lenmode='fraction',
        outlinewidth=0
        )
)

line_x = go.Scatter(
            x=np.arange(0,len(thk[0])).tolist(),
            y=thk[30],
            mode='lines',
            yaxis='y2'
         )

line_y = go.Scatter(
            y=np.arange(0,len(thk[0])).tolist(),
            x=thk[10],
            mode='lines',
            xaxis='x2'
        )

data = [thickness, line_x, line_y]

layout = go.Layout(
    showlegend=False,
    title='Thickness',
    margin=dict(t=50),
    height=800,
    width=800,
    xaxis=dict(
        domain=[0,0.8]
    ),
    yaxis=dict(
        domain=[0,0.8]
    ),
    xaxis2=dict(
        domain=[0.8,1],
        range=[y_min,y_max]
    ),
    yaxis2=dict(
        domain=[0.8,1],
        range=[y_min,y_max]
    )
)
fig = go.Figure(data=data, layout=layout)

with open('data.json', 'w') as f:
    f.write('data = ')
    f.write(json.dumps(data))
    f.write(';')
    f.write(os.linesep)
    f.write('layout = ')
    f.write(json.dumps(layout))
    f.write(';')
    f.write(os.linesep)

