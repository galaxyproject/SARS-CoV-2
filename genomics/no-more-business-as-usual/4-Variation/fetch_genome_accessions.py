import requests


# txid 2697049, genomic biomolecule, between 29500 and 30000 nt
query_term = 'txid2697049%5Borgn%5D%20AND%20%28biomol_genomic%5BPROP%5D%20AND%20%28%2229500%22%5BSLEN%5D%20%3A%20%2230000%22%5BSLEN%5D%29%29'

r = requests.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=nuccore&term=' + query_term + '&retmax=10000&retmode=json')
r.raise_for_status()
ids = r.json()['esearchresult']['idlist']
response = requests.post('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi', data={'db': 'nuccore', 'id': ids, 'rettype': "acc"})
response.raise_for_status()
all_ids = set(response.text.splitlines())
versionless_ids = {x.rsplit('.', 1)[0] for x in all_ids}
with open('genome_accessions.txt') as fh:
    existing_ids = set(fh.read().splitlines())
fetch_ids = list(versionless_ids - existing_ids)
if fetch_ids:
    print("fetching %d new genome accessions" % len(fetch_ids))
    stream = requests.post('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi', data={'db': 'nuccore', 'id': ",".join(fetch_ids), 'rettype': 'fasta'}, stream=True)
    stream.raise_for_status()
    with open('current_complete_ncov_genomes.fasta', 'ab') as out:
        for chunk in stream.iter_content(chunk_size=1000**2):
            if chunk:
                # drop double-newlines incuded in fetch response
                out.write(b"\n".join((l for l in chunk.splitlines() if l)))
    with open('genome_accessions.txt', 'a') as fh:
        fh.write("\n".join(fetch_ids))
        fh.write("\n")
