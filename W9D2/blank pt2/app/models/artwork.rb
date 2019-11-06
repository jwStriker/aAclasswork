class Artwork
    validates :title, :image_url, presence: true
    validates :image_url, uniqueness: true
    validates :title, uniqueness: { scope: :artist_id }
    validates :favorite, inclusion: { in: [true, false] }
end