FROM ruby:3.4-bookworm
WORKDIR /site
ENV BUNDLE_PATH=/site/vendor/bundle
EXPOSE 4000
CMD ["bash", "-lc", "bundle install && bundle exec jekyll serve --host 0.0.0.0 --port 4000"]
