
class Queue: # A min priority queue. It doesn't need to be priority as far as I can tell, but it doesn't hurt, I think
    root = None

    def add(self, i, data):
        n = QueueVertex(i, data)
        # print("adding " + str(n))
        if self.root is None:
            self.root = n
        else:
            self.root = self.root.add(n)
        return self

    def pop(self):
        if self.root is None:
            return None
        oldroot = self.root
        if oldroot.right is not None:
            self.root = oldroot.right.add(oldroot.left)
        else:
            self.root = None
        return oldroot.data

    def isEmpty(self):
        return self.root is None

    def __str__(self):
        if self.root is None:
            return "Empty Queue"
        return str(self.root)

class QueueVertex:
    def __init__(self, i, data):
        self.i = i
        self.data = data
        self.right = None
        self.left = None

    def add(self, n):
        if n is None:
            return self
        if self.i > n.i: # The comparison happens
            return n.add(self)
        if self.right == None:
            self.right = n
            return self
        if self.left == None: # self < right < left
            if self.right.i > n.i:
                self.left = self.right
                self.right = n
                return self
            else:
                self.left = n
                return self
        self.left = self.left.add(n)
        return self

    def __str__(self):
        string = "<" + str(self.i) + ">" + str(self.data)
        if self.right is not None:
            string += ", " + str(self.right)
        if self.left is not None:
            string += ", " + str(self.left)
        return string

# q = Queue()
# print(q.isEmpty())
# q.add(1,12).add(2,12).add(31,(1,2,3)).add(4,5).add(-1,"string type").add(0,0)
# while not q.isEmpty():
#     print(q.pop())