require 'erb'

class ShowExceptions
  attr_reader :app

  def initialize(app)
    @app = app
  end

  def call(env)
    app.call(env)
  rescue Exception => e
    render_exception(e)
  end

  private

  def render_exception(e)
    path = File.dirname(__FILE__)
    template_fname = File.join(path, "templates","rescue.html.erb")
    template = File.read(template_fname)
    body = ERB.new(template).result(binding)

    ['500', {'Content-type' => 'text/html'}, body]
  end

# ['200', {'Content-Type' => 'text/html'}, ['hello world']]

end
