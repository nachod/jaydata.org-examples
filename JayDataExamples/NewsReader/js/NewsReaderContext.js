﻿$data.Class.define("$news.Types.Category", $data.Entity, null, {
    Id: { dataType: "int", key: true, computed: true },
    Title: { dataType: "string" },
	Subtitle: { dataType: "string" },
    Description: { dataType: "string" },
    Articles: { dataType: "Array", elementType: "$news.Types.Article", inverseProperty: "Category" }
}, null);
$data.Class.define("$news.Types.Article", $data.Entity, null, {
    Id: { dataType: "int", key: true, computed: true },
    Title: { dataType: "string" },
    Lead: { dataType: "string" },
    Body: { dataType: "string" },
    CreateDate: { dataType: "datetime" },
    Thumbnail_LowRes: { dataType: "blob" },
    Thumbnail_HighRes: { dataType: "blob" },
    Category: { dataType: "$news.Types.Category", inverseProperty: 'Articles', required: true },
    Tags: { dataType: "Array", elementType: "$news.Types.TagConnection", inverseProperty: "Article" },
    Author: { dataType: "$news.Types.User", inverseProperty: 'Articles' }
}, null);
$data.Class.define("$news.Types.TagConnection", $data.Entity, null, {
    Id: { dataType: "int", key: true, computed: true },
    Article: { dataType: "$news.Types.Article", inverseProperty: 'Tags', required: true },
    Tag: { dataType: "$news.Types.Tag", inverseProperty: 'Articles', required: true }
}, null);
$data.Class.define("$news.Types.Tag", $data.Entity, null, {
    Id: { dataType: "int", key: true, computed: true },
    Title: { dataType: "string" },
    Articles: { dataType: "Array", elementType: "$news.Types.TagConnection", inverseProperty: "Tag" }
}, null);
$data.Class.define("$news.Types.User", $data.Entity, null, {
    Id: { dataType: "int", key: true, computed: true },
    LoginName: { dataType: "string" },
    Email: { dataType: "string" },
    Articles: { dataType: "Array", elementType: "$news.Types.Article", inverseProperty: "Author", required: true },
    Profile: { dataType: "$news.Types.UserProfile", inverseProperty: "User" }
}, null);
$data.Class.define("$news.Types.UserProfile", $data.Entity, null, {
    Id: { dataType: "int", key: true, computed: true },
    FullName: { dataType: "string" },
    Bio: { dataType: "string" },
    Avatar: { dataType: "blob" },
    Location: { dataType: "$news.Types.Location" },
    Birthday: { dataType: "date" },
    User: { dataType: "$news.Types.User", inverseProperty: 'Profile', required: true }
}, null);
$data.Class.define("$news.Types.Location", $data.Entity, null, {
    Address: { dataType: "string" },
    City: { dataType: "string" },
    Zip: { dataType: "int" },
    Country: { dataType: "string" }
}, null);
$data.Class.define("$news.Types.NewsContext", $data.EntityContext, null, {
    Categories: { dataType: $data.EntitySet, elementType: $news.Types.Category },
    Articles: { dataType: $data.EntitySet, elementType: $news.Types.Article },
    TagConnections: { dataType: $data.EntitySet, elementType: $news.Types.TagConnection },
    Tags: { dataType: $data.EntitySet, elementType: $news.Types.Tag },
    Users: { dataType: $data.EntitySet, elementType: $news.Types.User },
    UserProfiles: { dataType: $data.EntitySet, elementType: $news.Types.UserProfile }
}, null);
$news.Types.NewsContext.generateTestData = function (context, callBack) {
    var usr1 = new $news.Types.User({ LoginName: "Usr1", Email: "usr1@company.com", Profile: new $news.Types.UserProfile({ FullName: "Full Name", Bio: "Bio1", Birthday: new Date(Date.parse("1975.01.01")), Location: new $news.Types.Location({ Zip: 2840, City: 'City1', Address: 'Address6', Country: 'Country1' }) }) });
    var usr2 = new $news.Types.User({ LoginName: "Usr2", Email: "usr2@company.com", Profile: new $news.Types.UserProfile({ FullName: "Full Name", Bio: "Bio2", Birthday: new Date(Date.parse("1976.02.01")), Location: new $news.Types.Location({ Zip: 1117, City: 'City2', Address: 'Address7', Country: 'Country2' }) }) });
    var usr3 = new $news.Types.User({ LoginName: "Usr3", Email: "usr3@company.com", Profile: new $news.Types.UserProfile({ FullName: "Full Name1", Bio: "Bio3", Birthday: new Date(Date.parse("1977.03.01")), Location: new $news.Types.Location({ Zip: 1115, City: 'City3', Address: 'Address8', Country: 'Country3' }) }) });
    var usr4 = new $news.Types.User({ LoginName: "Usr4", Email: "usr4@company.com", Profile: new $news.Types.UserProfile({ FullName: "Full Name1", Bio: "Bio4", Birthday: new Date(Date.parse("1978.04.01")), Location: new $news.Types.Location({ Zip: 1211, City: 'City4', Address: 'Address9', Country: 'Country4' }) }) });
    var usr5 = new $news.Types.User({ LoginName: "Usr5", Email: "usr5@company.com", Profile: new $news.Types.UserProfile({ FullName: "Full Name2", Bio: "Bio5", Birthday: new Date(Date.parse("1979.05.01")), Location: new $news.Types.Location({ Zip: 3451, City: 'City5', Address: 'Address0', Country: 'Country5' }) }) });
    var usr6 = new $news.Types.User({ LoginName: "StartsWithTest", Email: "swt@company.com", Profile: new $news.Types.UserProfile({ FullName: "Starts With Test", Bio: "Bio6", Birthday: new Date(Date.parse("1980.06.01")), Location: new $news.Types.Location({ Zip: 8475, City: 'City6', Address: 'Address7', Country: 'Country8' }) }) });
    var cat1 = new $news.Types.Category({ Title: "Sport" });
    var cat2 = new $news.Types.Category({ Title: "World" });
    var cat3 = new $news.Types.Category({ Title: "Politics" });
    var cat4 = new $news.Types.Category({ Title: "Tech" });
    var cat5 = new $news.Types.Category({ Title: "Health" });
    var tag1 = new $news.Types.Tag({ Title: "Tag1" });
    var tag2 = new $news.Types.Tag({ Title: "Tag2" });
    var tag3 = new $news.Types.Tag({ Title: "Tag3" });
    var tag4 = new $news.Types.Tag({ Title: "Tag4" });
    var tag5 = new $news.Types.Tag({ Title: "Tag5" });
    context.Tags.add(tag4);
    context.Tags.add(tag5);

    context.Articles.add(new $news.Types.Article({ Title: "Article1", Lead: "Lead1", Body: "Body1", CreateDate: new Date(), Category: cat1, Author: usr1, Tags: [new $news.Types.TagConnection({ Tag: tag1 }), new $news.Types.TagConnection({ Tag: tag2 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article2", Lead: "Lead2", Body: "Body2", CreateDate: new Date(), Category: cat1, Author: usr2, Tags: [new $news.Types.TagConnection({ Tag: tag2 }), new $news.Types.TagConnection({ Tag: tag3 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article3", Lead: "Lead3", Body: "Body3", CreateDate: new Date(), Category: cat1, Author: usr3, Tags: [new $news.Types.TagConnection({ Tag: tag3 }), new $news.Types.TagConnection({ Tag: tag1 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article4", Lead: "Lead4", Body: "Body4", CreateDate: new Date(), Category: cat1, Author: usr4, Tags: [new $news.Types.TagConnection({ Tag: tag1 }), new $news.Types.TagConnection({ Tag: tag2 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article5", Lead: "Lead5", Body: "Body5", CreateDate: new Date(), Category: cat1, Author: usr5, Tags: [new $news.Types.TagConnection({ Tag: tag2 }), new $news.Types.TagConnection({ Tag: tag3 })] }));

    context.Articles.add(new $news.Types.Article({ Title: "Article21", Lead: "Lead21", Body: "Body21", CreateDate: new Date(), Category: cat2, Author: usr1, Tags: [new $news.Types.TagConnection({ Tag: tag3 }), new $news.Types.TagConnection({ Tag: tag1 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article22", Lead: "Lead22", Body: "Body22", CreateDate: new Date(), Category: cat2, Author: usr2, Tags: [new $news.Types.TagConnection({ Tag: tag1 }), new $news.Types.TagConnection({ Tag: tag2 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article23", Lead: "Lead23", Body: "Body23", CreateDate: new Date(), Category: cat2, Author: usr3, Tags: [new $news.Types.TagConnection({ Tag: tag2 }), new $news.Types.TagConnection({ Tag: tag3 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article24", Lead: "Lead24", Body: "Body24", CreateDate: new Date(), Category: cat2, Author: usr4, Tags: [new $news.Types.TagConnection({ Tag: tag3 }), new $news.Types.TagConnection({ Tag: tag1 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article25", Lead: "Lead25", Body: "Body25", CreateDate: new Date(), Category: cat2, Author: usr5, Tags: [new $news.Types.TagConnection({ Tag: tag1 }), new $news.Types.TagConnection({ Tag: tag2 })] }));

    context.Articles.add(new $news.Types.Article({ Title: "Article31", Lead: "Lead31", Body: "Body31", CreateDate: new Date(), Category: cat3, Author: usr1, Tags: [new $news.Types.TagConnection({ Tag: tag2 }), new $news.Types.TagConnection({ Tag: tag3 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article32", Lead: "Lead32", Body: "Body32", CreateDate: new Date(), Category: cat3, Author: usr2, Tags: [new $news.Types.TagConnection({ Tag: tag3 }), new $news.Types.TagConnection({ Tag: tag1 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article33", Lead: "Lead33", Body: "Body33", CreateDate: new Date(), Category: cat3, Author: usr3, Tags: [new $news.Types.TagConnection({ Tag: tag1 }), new $news.Types.TagConnection({ Tag: tag2 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article34", Lead: "Lead34", Body: "Body34", CreateDate: new Date(), Category: cat3, Author: usr4, Tags: [new $news.Types.TagConnection({ Tag: tag2 }), new $news.Types.TagConnection({ Tag: tag3 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article35", Lead: "Lead35", Body: "Body35", CreateDate: new Date(), Category: cat3, Author: usr5, Tags: [new $news.Types.TagConnection({ Tag: tag3 }), new $news.Types.TagConnection({ Tag: tag1 })] }));

    context.Articles.add(new $news.Types.Article({ Title: "Article41", Lead: "Lead41", Body: "Body41", CreateDate: new Date(), Category: cat4, Author: usr1, Tags: [new $news.Types.TagConnection({ Tag: tag1 }), new $news.Types.TagConnection({ Tag: tag2 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article42", Lead: "Lead42", Body: "Body42", CreateDate: new Date(), Category: cat4, Author: usr2, Tags: [new $news.Types.TagConnection({ Tag: tag2 }), new $news.Types.TagConnection({ Tag: tag3 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article43", Lead: "Lead43", Body: "Body43", CreateDate: new Date(), Category: cat4, Author: usr3, Tags: [new $news.Types.TagConnection({ Tag: tag3 }), new $news.Types.TagConnection({ Tag: tag1 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article44", Lead: "Lead44", Body: "Body44", CreateDate: new Date(), Category: cat4, Author: usr4, Tags: [new $news.Types.TagConnection({ Tag: tag1 }), new $news.Types.TagConnection({ Tag: tag2 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article45", Lead: "Lead45", Body: "Body45", CreateDate: new Date(), Category: cat4, Author: usr5, Tags: [new $news.Types.TagConnection({ Tag: tag2 }), new $news.Types.TagConnection({ Tag: tag3 })] }));

    context.Articles.add(new $news.Types.Article({ Title: "Article51", Lead: "Lead51", Body: "Body51", CreateDate: new Date(), Category: cat5, Author: usr1, Tags: [new $news.Types.TagConnection({ Tag: tag3 }), new $news.Types.TagConnection({ Tag: tag1 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article52", Lead: "Lead52", Body: "Body52", CreateDate: new Date(), Category: cat5, Author: usr2, Tags: [new $news.Types.TagConnection({ Tag: tag1 }), new $news.Types.TagConnection({ Tag: tag2 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article53", Lead: "Lead53", Body: "Body53", CreateDate: new Date(), Category: cat5, Author: usr3, Tags: [new $news.Types.TagConnection({ Tag: tag2 }), new $news.Types.TagConnection({ Tag: tag3 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article54", Lead: "Lead54", Body: "Body54", CreateDate: new Date(), Category: cat5, Author: usr4, Tags: [new $news.Types.TagConnection({ Tag: tag3 }), new $news.Types.TagConnection({ Tag: tag1 })] }));
    context.Articles.add(new $news.Types.Article({ Title: "Article55", Lead: "Lead55", Body: "Body55", CreateDate: new Date(), Category: cat5, Author: usr5, Tags: [new $news.Types.TagConnection({ Tag: tag1 }), new $news.Types.TagConnection({ Tag: tag2 })] }));

    context.Articles.add(new $news.Types.Article({ Title: "Article65", Lead: "Lead65", Body: "Body65", CreateDate: new Date(), Category: cat3, Author: usr6, Tags: [new $news.Types.TagConnection({ Tag: tag2 }), new $news.Types.TagConnection({ Tag: tag1 })] }));

    context.saveChanges(function (count) {
        console.log("Success upload testdb for: " + count + " items");
        if (callBack) {
            callBack(count);
        }
    });
}
