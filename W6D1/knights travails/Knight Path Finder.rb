require_relative "tree node"
require "byebug"

class KnightPathFinder

    attr_reader :pos, :root_node, :considered

    def initialize(pos)
        @pos = pos 
        @root_node = PolyTreeNode.new(pos)
        @considered = [@pos]
    end

    def self.valid_moves(pos)
        v = []
        x,y = pos 
        v << [x+2, y+1] if valid_move?([x+2, y+1])
        v << [x+2, y-1] if valid_move?([x+2, y-1])
        v << [x+1, y+2] if valid_move?([x+1, y+2])
        v << [x+1, y-2] if valid_move?([x+1, y-2])
        v << [x-2, y+1] if valid_move?([x-2, y+1])
        v << [x-2, y-1] if valid_move?([x-2, y-1])
        v << [x-1, y+2] if valid_move?([x-1, y+2])
        v << [x-1, y-2] if valid_move?([x-1, y-2])
        v
    end

    def self.valid_move?(pos)
        x,y = pos 
        x.between?(0,7) && y.between?(0,7) 
    end

    def new_move_positions(pos)
        moves = KnightPathFinder.valid_moves(pos).select { |i| i if (!@considered.include?(i)) }
        @considered.concat(moves)
        moves
    end

    def build_move_tree
        nodes = [@root_node]
        until nodes.empty?
            current_node = nodes.shift
            current_pos = current_node.value 

            new_move_positions(current_pos).each do |next_pos|
                next_node = PolyTreeNode.new(next_pos)
                current_node.add_child(next_node)
                nodes << next_node
            end
        end
    end

    def find_path(end_pos)
        last = @root_node.dfs(end_pos)
        trace_path_back(last)
    end

    def trace_path_back(last)
        path = [last.value]
        until last.parent.nil?
            path << last.parent.value
            last = last.parent 
        end 
        path.reverse
    end

end

kpf = KnightPathFinder.new([0, 0])
kpf.build_move_tree
p kpf.find_path([7, 6]) # => [[0, 0], [1, 2], [2, 4], [3, 6], [5, 5], [7, 6]]
p kpf.find_path([6, 2]) # => [[0, 0], [1, 2], [2, 0], [4, 1], [6, 2]]