FROM ruby:2.7.2

ADD Gemfile /app/
ADD Gemfile.lock /app/
WORKDIR /app
RUN gem install bundler:1.17.3
RUN bundle install
ADD . /app

EXPOSE 3000
CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "3000"]
