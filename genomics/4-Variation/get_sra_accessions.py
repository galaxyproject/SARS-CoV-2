from xml.etree.ElementTree import fromstring

import requests


r = requests.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=sra&term=txid2697049[Organism%3Anoexp]&retmax=10000&retmode=json').json()
ids = r['esearchresult']['idlist']
sra = requests.post('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi', data={'db': 'sra', 'id': ids, 'retmode': 'json'})
etree = fromstring(sra.text)

with open('sra.txt', 'w') as out:
    out.write("\n".join([e.text for e in etree.findall('.//PRIMARY_ID') if e.text.startswith('SRR')]))
