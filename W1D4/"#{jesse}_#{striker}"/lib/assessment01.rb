require 'byebug'
class Array

  # Monkey patch the Array class and add a my_inject method. If my_inject receives
  # no argument, then use the first element of the array as the default accumulator.

  def my_inject(accumulator = nil)
    return self.first if accumulator == nil 

  end
end

# primes(num) returns an array of the first "num" primes.
# You may wish to use an is_prime? helper method.

def is_prime?(num)
  (2...num).each { |i| return false if num % i == 0 }
end

def primes(num)
  primes = []
  while primes.length < num
    (2..100).each { |i| primes << i if is_prime?(i) }
  end 
  primes.take(num)
end

# Write a recursive method that returns the first "num" factorial numbers.
# Note that the 1st factorial number is 0!, which equals 1. The 2nd factorial
# is 1!, the 3rd factorial is 2!, etc.

def factorials_rec(num)
  return [1] if num == 0
factorials_rec(num-1) << num
end

class Array

  # Write an Array#dups method that will return a hash containing the indices of all
  # duplicate elements. The keys are the duplicate elements; the values are
  # arrays of their indices in ascending order, e.g.
  # [1, 3, 4, 3, 0, 3, 0].dups => { 3 => [1, 3, 5], 0 => [4, 6] }

  def dups
    dupe_hash = Hash.new {[]}
    self.each_with_index {|ele, idx| dupe_hash[ele] = dupe_hash[ele] << idx }
    dupe_hash
  end
end

class String

  # Write a String#symmetric_substrings method that returns an array of substrings
  # that are palindromes, e.g. "cool".symmetric_substrings => ["oo"]
  # Only include substrings of length > 1.

  def symmetric_substrings
    palindromes = []
    (0...self.length).each do |start_idx|
      (start_idx...self.length).each do |last_idx|
        substring = self[start_idx, last_idx]
        if substring.length > 1 && substring == substring.reverse
          palindromes << substring 
        end 
      end 
    end 
    palindromes << self if self.reverse == self 
    palindromes.uniq
  end
end

class Array

  # Write an Array#merge_sort method; it should not modify the original array.

  def merge_sort(&prc)
    prc ||= Prc.new { a <=> b }
    
  end

  private
  def self.merge(left, right, &prc)

  end
end
