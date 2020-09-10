$.ajaxPrefilter(function (rel) {
  rel.url = "http://ajax.frontend.itheima.net" + rel.url;
  console.log(rel.url);
});
