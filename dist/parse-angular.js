!function(t,e){var r=t.angular;if(r!==e){var o=r.module("parse-angular",[]);o.run(["$q","$window",function(t,e){if(!r.isUndefined(e.Parse)&&r.isObject(e.Parse)){var o=e.Parse,n={Object:{prototype:["save","fetch","destroy"],"static":["saveAll","destroyAll"]},File:{prototype:["save"],"static":[]},Query:{prototype:["find","first","count","get"],"static":[]},Cloud:{prototype:[],"static":["run"]},User:{prototype:["signUp"],"static":["requestPasswordReset","logIn"]},FacebookUtils:{prototype:[],"static":["logIn","link","unlink"]},Config:{prototype:[],"static":["get"]}};for(var i in n){var a=i,s=n[i],p=s.prototype,u=s["static"];p.forEach(function(e){var r=o[a].prototype[e];o[a].prototype[e]=function(){return r.apply(this,arguments).then(function(e){var r=t.defer();return r.resolve(e),r.promise},function(e){var r=t.defer();return r.reject(e),r.promise})}}),u.forEach(function(e){var r=o[a][e];o[a][e]=function(){return r.apply(this,arguments).then(function(e){var r=t.defer();return r.resolve(e),r.promise},function(e){var r=t.defer();return r.reject(e),r.promise})}})}}}])}}(this);