require "byebug"

class PolyTreeNode
    attr_reader :value, :parent, :children

    def initialize(value)
        @value = value
        @parent = nil
        @children = []
    end

    def parent=(node)
        unless node.nil?
            if @parent.nil? && !node.nil?
                @parent = node
                node.children << self if !node.children.include?(self)
            else
                @parent.children.delete(self)
                @parent = node
                node.children << self if !node.children.include?(self)
            end 
        end
        @parent = nil if node.nil?
    end

    def add_child(child_node)
        child_node.parent = self 
    end 

    def remove_child(child_node)
        raise "Not a child!" if child_node.parent.nil?
        child_node.parent = nil 
    end
    
    def dfs(target = nil, &prc)
        prc ||= Proc.new { |node| node.value == target }
        return self if prc.call(self)
        @children.each do |child|
            var = child.dfs(&prc)
            return var unless var == nil
        end
        nil
    end

    def bfs(target = nil, &prc)
        prc ||= Proc.new { |node| node.value == target }
        queue = [self]
        until queue.empty?
            parent = queue.shift
            return parent if prc.call(parent)
            queue.concat(parent.children)
        end
        nil
    end

end
