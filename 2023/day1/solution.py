def part1() -> int:
  with open('./input.txt', 'r') as f:
    inputs = f.readlines()
    total = 0
    for line in inputs:
      arr = []
      for c in line:
        if c.isnumeric():
          arr.append(c)
      total += int(arr[0] + arr[-1])
    print(total)
    
part1()

def part2() -> int:
  with open('./input.txt', 'r') as f:
    inputs = f.readlines()
    m = {
      "one": 1,
      "two": 2,
      "three": 3,
      "four": 4,
      "five": 5,
      "six": 6,
      "seven": 7,
      "eight": 8,
      "nine": 9,
    }
    total = 0
    for line in inputs:
      for k in m.keys():
        line = line.replace(k, k + str(m[k]) + k) 
      arr = []
      for c in line:
        if c.isnumeric():
          arr.append(c)
      total += int(arr[0] + arr[-1])
    print(total)

part2()