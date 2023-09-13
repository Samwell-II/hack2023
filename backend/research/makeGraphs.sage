for g in digraphs.tournaments_nauty(11, min_out_degree=5,max_out_degree=5):
    print(str(g.to_dictionary()))
