let compute = function (data) {
    let posts = data.data;
    let ret = [];
    for (let x = 0; x < posts.length; x++) {
        let date = posts[x].date;
        
        let index = ret.findIndex((item) => {
            return item.date.toDate().getFullYear() == date.toDate().getFullYear() && item.date.toDate().getMonth() == date.toDate().getMonth();
        });

        if (index >= 0) {
            ret[index].list.push(posts[x]);
        } else {
            ret.push({date: date, list: [posts[x]]});
        }
    }

    return ret;
}

hexo.extend.generator.register('timeline', function(locals){
    let x = compute(locals.posts);
    return {
        path: 'timeline/index.html',
        data: {posts: x},
        layout: ['timeline', 'index']
    }
});
