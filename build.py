#!/usr/bin/env python3
"""Embed data into pages/*.src.js -> pages/*.js (the files Squarespace loads).
trips/trips.json -> /*TRIPS*/[]   (summary list, used by the home page)
trips/<id>.json  -> /*DETAIL*/{}  (full trip pages, keyed by id; used by pages/trip.src.js)"""
import json, glob, os
trips = json.load(open('trips/trips.json'))['trips']
detail = {}
for f in glob.glob('trips/*.json'):
    if os.path.basename(f) == 'trips.json':
        continue
    d = json.load(open(f)); detail[d['id']] = d
team = json.load(open('team/team.json')) if os.path.exists('team/team.json') else {}
for src in glob.glob('pages/*.src.js'):
    s = open(src).read().replace('/*TEAM*/{}', json.dumps(team, ensure_ascii=False)).replace('/*TRIPS*/[]', json.dumps(trips, ensure_ascii=False)).replace('/*DETAIL*/{}', json.dumps(detail, ensure_ascii=False))
    open(src.replace('.src.js', '.js'), 'w').write(s)
    print('built', src.replace('.src.js', '.js'), len(s))
