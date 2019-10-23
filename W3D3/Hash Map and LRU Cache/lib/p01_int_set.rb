class MaxIntSet
  attr_reader :max, :store
  def initialize(max)
    @max = max
    @store = Array.new(max, false)
  end

  def insert(num)
    raise "Out of bounds" if !valid?(num)
    return false if @store[num]
    self.store[num] = true
  end

  def remove(num)
    raise "Out of bounds" if !valid?(num)
    return false if !@store[num]
    self.store[num] = false
  end

  def include?(num)
    self.store[num]
  end

  private
  def valid?(num)
    num.between?(0, max - 1)
  end
  
end


class IntSet
  attr_reader :store
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
  end

  def insert(num)
    return false if include?(num)
    self[num] << num
  end

  def remove(num)
    self[num].delete(num)
  end

  def include?(num)
    self[num].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    self.store[num % num_buckets]
  end

  def num_buckets
    self.store.length
  end
end

class ResizingIntSet
  attr_accessor :count, :store

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(num)
    return false if include?(num)
    self[num] << num
    self.count += 1
    resize! if num_buckets < self.count 
  end

  def remove(num)
    self.count -= 1 if self[num].delete(num)
  end

  def include?(num)
    self[num].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
    self.store[num % num_buckets]
  end

  def num_buckets
    self.store.length
  end

  def resize!
    initial_store = self.store
    self.count = 0
    self.store = Array.new(num_buckets * 2) { Array.new }
    initial_store.flatten.each { |item| insert(item) }
  end
end
