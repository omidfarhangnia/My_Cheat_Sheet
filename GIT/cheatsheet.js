// these are all the rules
// ni index.html ==> for creating a new index.html file
// git init ==> for making a file ready for using git rules
// git add ==> it will add all the changes
// git commit -m "lalala" ==> it will commit these change with our special message
// git push ==> it will push all the files to the github page
// git diff HEAD ==> will show your current page vs old page
// git diff --staged ==> will show your current page vs old page that we added them in the last time
// git reset ==> with this rule we can bring out a file from stage
// git reset --hard HEAD~1 ==> -hard: Resets the working directory and the index to the state of the previous commit
// git reset --soft HEAD~1 ==> -soft: Resets the index but leaves the working directory unchanged. Your changes will be staged and ready for a new commit
// git chechout -- index.html ==> when we didn't add it we can using this for coming back to the base
// git branch ==> we can give the name of branches that we have
// git branch Name ==> we can make a new branch with the name of Name
// git checkout Name ==> we can switch to the other branches
// git rm index.html ==> we can delete index.html 
// cat index.html ==> i will see all the codes that i have in my index.html file
// git branch -d Name ==> i can delete the branch that the name of this branch is Name
// ls ==> i can give the name of all files or folders that i have in a folder
// git clone https://github... ==> we can clone all the files with this tag into our file
// cd .. ==> going the the parent of our file
// cd FileName ==> going the the file that we have it in our file 
// git remote ==> we will see all the remotes that we have
// git remote add Name https:// || ssh || ... ==> we will add a new remote with the name of name with this address
// git remote -v ==> give us the full address of all remotes that we have ==> -v = verbose = long = lengthy
// git pull ==> we can give the newest version of the file that we are working with with this rulle
// git tag ==> i can see my tags with this rule
// git tag -a v2.0 -m "hello ..." ==> we can make a tag with the name of v2.0 with the message of "hello ..."
// git tag -d v2.0 ==> we can delete v2.0 tag with this code
// git tag -l "v*" ==> we can filter all the tags that have v in thier name
// git help SomeThing ==> git shows a full document of Something on the web automaticly with this rule
// git blame index.html -L10 ==> we can see a list of lines and thier written and we will know who wrote those lines
// git bisect start ==> we can start bisect process with this rule
// git bisect bad ==> we will say to git that we are in bad situation
// git bisect good 333002839kd03kdahnndi2ndnd ==> we are saying to git that we dont have any problem in 333002839kd03kdahnndi2ndnd sitation
// git bisect reset ==> we can going out of bisect process with this rule

// i can close git log window with pressing q btn
// i can close commit message window with pressing esc and writing :wq 


// اولین نکته اگر ما چیزی رو اد کردیم و میخواهیم که اون رو به حالت اولش برگردونیم باید اول از استیج خراجش کنیم
// اول در خود فایل فرزند باید اد و کامیت صورت بگیرد و در مرحله دوم باید در فایل پدر هم اد و کامیت صورت بگیرد
// دومین نکته ما با دستورات سیدی میتوانیم در فایل های حرکت کنیم اما وقتی ما ترمینالی برای فایل پدر داریم وقتی یک بار فایل فرزند را تغییر دادم 
// نکته سوم به مکان هایی که ما میتوانیم کد ها را از آن کلون کنیم و بعد به آن مکان ها پوش کنیم ریموت گفته میشود
// conflict زمانی که دو نفر در یک قسمت از پروژه از با ابزار های متفاوت تغییری ایجاد میکنند به اصطلاح ما در آن مکان دچار کانفلیکت میشویم


// برای بالا بردن امنیت کار و اینکه مطیین باشید که دقیقا چه کسی تغییرات را اعمال میکند باید اول جی پی جی را نصب کنید
// و در مرحله دوم برای خودتان یک امضا قرار دهید و بعد هر کاری که شما بکنید با امضای شما رمزنگاری میشود
