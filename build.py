#!/usr/bin/env python3
"""Embed trips/trips.json into pages/*.src.js -> pages/*.js (the files Squarespace loads)."""
import json, glob
trips = json.load(open('trips/trips.json'))['trips']
for src in glob.glob('pages/*.src.js'):
    s = open(src).read().replace('/*TRIPS*/[]', json.dumps(trips, ensure_ascii=False))
    open(src.replace('.src.js', '.js'), 'w').write(s)
    print('built', src.replace('.src.js', '.js'), len(s))
