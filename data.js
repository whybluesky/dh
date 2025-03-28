// 书签数据
const defaultBookmarks = [
    {
        category: "宝塔",
        bookmarks: [
            {
                title: "本地宝塔Linux面板",
                url: "http://192.168.182.133:8888/328f7639"
            },
            {
                title: "happythems本地宝塔Linux面板",
                url: "http://192.168.29.128:8888/328f7639"
            },
            {
                title: "宝塔Linux面板亚马逊2024/10/9",
                url: "http://13.208.42.91:29414/c273f2c4"
            },
            {
                title: "CC阿里云远程服务器1Panel",
                url: "http://47.96.147.105:26644/205e035267"
            },
            {
                title: "华为上海宝塔Linux面板应万25/3/4",
                url: "http://121.36.194.101:30203/80d6337f"
            },
            {
                title: "宝塔Linux面板4/09/美国47hwuikh",
                url: "https://156.238.230.150:30072/25af70a9"
            },
            {
                title: "宝塔Linux面板4/19好多料",
                url: "https://154.217.246.111:13873/35eddbc5"
            },
            {
                title: "宝塔Linux面板青橙3/5",
                url: "https://116.62.106.76:10345/62772cd9"
            },
            {
                title: "宝塔Linux面板火山材26/3/6",
                url: "http://14.103.135.122:38842/9640d1e2"
            }
        ]
    },
    {
        category: "淘宝",
        bookmarks: [
            {
                title: "店内搜索页-飞鸟学堂-淘宝网",
                url: "https://shop113493021.taobao.com/search.htm?spm=a1z10.3-c.w5002-8667048511.1.5fe177cc3CA1wn&search=y"
            },
            {
                title: "宝藏店，复制他店铺源码 价格翻倍店内搜索页-梦呓客栈-淘宝网",
                url: "https://mykz.taobao.com/search.htm?spm=a1z10.3-c-s.w4002-24881821158.5.6ce9364a7OpEVI&_ksTS=1715178943358_107&callback=jsonp108&input_charset=gbk&mid=w-24881821158-0&wid=24881821158&path=%2Fsearch.htm&orderType=hotsell_desc"
            },
            {
                title: "店内搜索页-JavaWeb之家-淘宝网",
                url: "https://javawebhome.taobao.com/search.htm?spm=a1z10.3-c.w4002-25279365743.5.1a8c3f2d3AOLhU&_ksTS=1714529687500_107&callback=jsonp108&input_charset=gbk&mid=w-25279365743-0&wid=25279365743&path=%2Fsearch.htm&orderType=hotsell_desc"
            },
            {
                title: "店内搜索页-奇贝乐教育在线-淘宝网",
                url: "https://shop459605264.taobao.com/search.htm?spm=2013.1.0.0.321b1d26OT6sat&search=y"
            }
        ]
    },
    {
        category: "源码",
        bookmarks: [
            {
                title: "java在线问卷调查系统web源代码jsp项目设计源码带文档sqlserver-淘宝网",
                url: "https://item.taobao.com/item.htm?id=773746348254"
            },
            {
                title: "学习软件英语点读教材同步课程视频早教机软件9科12年终身卡正品-阿里巴巴",
                url: "https://detail.1688.com/offer/631341067041.html?spm=a26352.13672862.offerlist.82.5b6c78e4cY4zZI"
            }
        ]
    },
    {
        category: "文章",
        bookmarks: [
            {
                title: "站长学院|CMS教程|网络编程|数据库|网站运营|网页制作}不错吧",
                url: "https://bbs.bucuoba.com/forum.php?gid=77"
            },
            {
                title: "微三云——元宇宙电商解决方案",
                url: "https://www.weisanyun.cn/nfg.html"
            }
        ]
    },
    {
        category: "软件工具",
        bookmarks: [
            {
                title: "百度一下",
                url: "https://www.baidu.com/?tn=40020637_30_oem_dg"
            },
            {
                title: "淘宝网",
                url: "https://www.taobao.com/"
            },
            {
                title: "吾爱破解 - LCG - LSG|安卓破解|病毒分析|www.52pojie.cn",
                url: "https://www.52pojie.cn/"
            }
        ]
    },
    {
        category: "chatgtp",
        bookmarks: []
    },
    {
        category: "小红书",
        bookmarks: []
    }
];

// 解析书签HTML文件的函数
function parseBookmarks(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const bookmarks = [];
    let currentPath = [];

    // 递归处理DL标签内的书签
    function processDL(dl) {
        Array.from(dl.children).forEach(child => {
            if (child.tagName === 'DT') {
                // 处理分类标题
                const h3 = child.querySelector('h3');
                if (h3) {
                    const category = h3.textContent.trim();
                    const addDate = h3.getAttribute('ADD_DATE');
                    const lastModified = h3.getAttribute('LAST_MODIFIED');
                    const isPersonalToolbar = h3.getAttribute('PERSONAL_TOOLBAR_FOLDER');
                    
                    const categoryObj = {
                        category: category,
                        bookmarks: [],
                        addDate: addDate,
                        lastModified: lastModified,
                        isPersonalToolbar: isPersonalToolbar === 'true',
                        path: [...currentPath, category]
                    };
                    
                    currentPath.push(category);
                    bookmarks.push(categoryObj);

                    // 处理子文件夹
                    const subDL = child.querySelector('dl');
                    if (subDL) {
                        processDL(subDL);
                    }
                    currentPath.pop();
                }

                // 处理书签链接
                const a = child.querySelector('a');
                if (a && currentPath.length > 0) {
                    const parentCategory = bookmarks.find(b => 
                        b.category === currentPath[currentPath.length - 1]
                    );
                    if (parentCategory) {
                        parentCategory.bookmarks.push({
                            title: a.textContent.trim(),
                            url: a.href,
                            icon: a.getAttribute('ICON') || '',
                            addDate: a.getAttribute('ADD_DATE'),
                            lastModified: a.getAttribute('LAST_MODIFIED')
                        });
                    }
                }
            }
        });
    }

    // 开始处理根DL标签
    const rootDL = doc.querySelector('dl');
    if (rootDL) {
        processDL(rootDL);
    }

    return bookmarks;
}

// 加载书签文件
fetch('收藏20250328-201623.html')
    .then(response => response.text())
    .then(html => {
        const bookmarks = parseBookmarks(html);
        // 更新书签数据
        defaultBookmarks.forEach(category => {
            const categoryBookmarks = bookmarks.find(b => b.category === category.category);
            if (categoryBookmarks) {
                category.bookmarks = categoryBookmarks.bookmarks;
            }
        });
    })
    .catch(error => console.error('Error loading bookmarks:', error));