
import plotly
import sys
import os
import numpy
import netCDF4

def drawPlot():
    py = plotly.plotly();
    x = [0,1,2,3,4]
    y = [0,1,4,9,16]
    data = {'x': x, 'y', y}

if __name__ == "__main__":
    drawPlot();
