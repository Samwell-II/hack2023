for g in digraphs.tournaments_nauty(7, min_out_degree=3,max_out_degree=3):
    print(str(g.to_dictionary()))
