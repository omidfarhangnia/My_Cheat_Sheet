/************************************************************
-- #######################################################

use [ECommerce]
go

-- #######################################################

create schema Auth
go

create table Auth.Roles (
   RoleId int identity(1,1) primary key,
   RoleName varchar(50) not null unique,
   RoleDescription varchar(255),
)
go

insert into Auth.Roles(RoleName, RoleDescription) values 
('Customer', 'Regular customer who can place orders'),
('Seller', 'User who can manage and sell products'),
('Support', 'Customer support agent'),
('Manager', 'Business manager with reporting access'),
('Admin', 'Full access to system management')
go

-- #######################################################

create table Auth.Users (
	UserId int Identity(1,1) primary key,
	FirstName varchar(100) not null,
	LastName varchar(100) not null,
	PhoneNumber varchar(20) not null unique,
  Email varchar(255) not null unique,
	ImgUrl varchar(255),
	RoleId int default 1,
	CreatedAt datetime2 default getDate(),
  foreign key (RoleId) references Auth.Roles(RoleId),
)
go

create index IX_Users_RoleId
On Auth.Users(RoleId)
go

insert into Auth.Users(FirstName, LastName, PhoneNumber, Email, ImgUrl, RoleId) values
('Ali', 'Ahmadi', '09120000001', 'ali.ahmadi@example.com', 'img/users/1.jpg', 1),
('Sara', 'Mohammadi', '09120000002', 'sara.mohammadi@example.com', 'img/users/2.jpg', 1),
('Reza', 'Karimi', '09120000003', 'reza.karimi@example.com', 'img/users/3.jpg', 2),
('Neda', 'Hosseini', '09120000004', 'neda.hosseini@example.com', 'img/users/4.jpg', 1),
('Amir', 'Rahimi', '09120000005', 'amir.rahimi@example.com', 'img/users/5.jpg', 1),
('Fatemeh', 'Jafari', '09120000006', 'fatemeh.jafari@example.com', 'img/users/6.jpg', 2),
('Hossein', 'Moradi', '09120000007', 'hossein.moradi@example.com', 'img/users/7.jpg', 1),
('Leila', 'Ghasemi', '09120000008', 'leila.ghasemi@example.com', 'img/users/8.jpg', 1),
('Mehdi', 'Sadeghi', '09120000009', 'mehdi.sadeghi@example.com', 'img/users/9.jpg', 1),
('Zahra', 'Yousefi', '09120000010', 'zahra.yousefi@example.com', 'img/users/10.jpg', 2);
go

-- #######################################################

create schema Address
go

create table Address.AddressTypes (
    TypeId int identity(1, 1) primary key,
	  TypeName varchar(50) not null unique,
)
go

insert into Address.AddressTypes (TypeName) values
('Home'),
('Work'),
('Billing'),
('Shipping'),
('Office'),
('Warehouse'),
('Other');
go

-- #######################################################

create table Address.UserAddresses (
  AddressId int identity(1,1) primary key,
  UserId int not null,
	TypeId int,
	City varchar(100) not null,
	Country varchar(50) not null,
    StreetAddress varchar(255) not null,
	PostalCode varchar(20) not null,
	CreatedAt datetime2 default getDate(),
	foreign key (UserId) references Auth.Users(UserId),
	foreign key (TypeId) references Address.AddressTypes(TypeId)
)
go

create index IX_UserAddresses_UserId
on Address.UserAddresses(UserId)
go

create index IX_UserAddresses_TypeId
on Address.UserAddresses(TypeId)
go

insert into Address.UserAddresses (UserId, TypeId, City, Country, StreetAddress, PostalCode) values
(1, 1, 'Tehran', 'Iran', 'Valiasr St, No 120', '1598745632'),
(1, 2, 'Tehran', 'Iran', 'Shariati St, No 45', '1589632147'),
(2, 1, 'Isfahan', 'Iran', 'Chaharbagh Abbasi, Alley 12', '8145632987'),
(2, 4, 'Isfahan', 'Iran', 'Hakim Nezami St, No 33', '8147852145'),
(3, 5, 'Tabriz', 'Iran', 'El Goli Blvd, No 88', '5132478965'),
(3, 6, 'Tabriz', 'Iran', 'Imam St, Warehouse 4', '5139874123'),
(4, 1, 'Shiraz', 'Iran', 'Zand Blvd, No 20', '7135698241'),
(4, 3, 'Shiraz', 'Iran', 'Afif Abad St, No 51', '7134569872'),
(5, 1, 'Mashhad', 'Iran', 'Ahmadabad St, No 60', '9185472365'),
(5, 4, 'Mashhad', 'Iran', 'Sajjad Blvd, No 15', '9187456321'),
(6, 5, 'Karaj', 'Iran', 'Azimieh Blvd, No 72', '3158742698'),
(6, 6, 'Karaj', 'Iran', 'Industrial Zone, Block B', '3156987421'),
(7, 1, 'Qom', 'Iran', 'Imam Khomeini St, No 9', '3712456987'),
(7, 2, 'Qom', 'Iran', 'Safashahr Blvd, No 17', '3715987426'),
(8, 1, 'Ahvaz', 'Iran', 'Naderi St, No 44', '6154789632'),
(8, 4, 'Ahvaz', 'Iran', 'Golestan Blvd, No 11', '6158742369'),
(9, 1, 'Rasht', 'Iran', 'Golsar Blvd, No 29', '4198756321'),
(9, 7, 'Rasht', 'Iran', 'Saadi St, No 8', '4196325874'),
(10, 5, 'Kerman', 'Iran', 'Shahid Beheshti St, No 63', '7612459873'),
(10, 3, 'Kerman', 'Iran', 'Azadi Sq, Building 5', '7615984236')
go

-- #######################################################

create function Auth.HashPassword (@Password nvarchar(200))
returns varbinary(64)
as
begin
    return hashbytes('SHA2_256', @Password)
end
go

create table Auth.UsersPassword (
	UserId int primary key,
	PasswordHashed varbinary(64) not null,
	LastUpdate datetime2 default getdate(),
	foreign key (UserId) references Auth.Users(UserId)
)
go

create procedure Auth.SetHashPassword 
@UserId int,
@Password nvarchar(200)
as
begin
    set nocount on;

	if exists (select 1 from Auth.UsersPassword where UserId = @UserID)
		update Auth.UsersPassword
		set 
			PasswordHashed = Auth.HashPassword(@Password),
			LastUpdate = getdate()
		where UserId = @UserID
	else
		insert into Auth.UsersPassword (UserId, PasswordHashed)
		values (@UserId, Auth.HashPassword(@Password))
end
go

exec Auth.SetHashPassword 1, 'Test@123'
exec Auth.SetHashPassword 2, 'Test@123'
exec Auth.SetHashPassword 3, 'Test@345'
exec Auth.SetHashPassword 4, 'Test@345'
exec Auth.SetHashPassword 5, 'Test'
exec Auth.SetHashPassword 6, 'Test'
exec Auth.SetHashPassword 7, '1234'
exec Auth.SetHashPassword 8, '1234'
exec Auth.SetHashPassword 9, 'omidfnia'
exec Auth.SetHashPassword 10, '1111'
go

--#######################################################

-- report: RolesUsage.rdl
--select 
--	ar.RoleId,
--	ar.RoleName,
--	ar.RoleDescription,
--	count(au.RoleId) as UsageAmount
--from Auth.Roles as ar
--left join Auth.Users as au on ar.RoleId = au.RoleId
--group by ar.RoleId, ar.RoleName, ar.RoleDescription

-- report: UsersFullData.rdl
--select 
--	u.UserId,
--	u.FirstName,
--	u.LastName,
--	up.PasswordHashed,
--	u.PhoneNumber,
--	u.Email,
--	r.RoleName,
--	(ua.Country + ' ' + ua.City + ' ' + ua.StreetAddress) as address,
--	ua.PostalCode,
--	at.TypeName as addressType
--from Auth.Users as u
--left join Auth.Roles as r on u.RoleId = r.RoleId
--left join Address.UserAddresses as ua on u.UserId = ua.UserId
--inner join Address.AddressTypes as at on ua.TypeId = at.TypeId
--inner join Auth.UsersPassword as up on u.UserId = up.UserId
--where u.FirstName like '%' + @FirstName + '%'
--and u.LastName like '%' + @LastName + '%'

-- report: UsersWithAddress
--select 
--	u.UserId,
--	u.FirstName,
--	u.LastName,
--	u.PhoneNumber,
--	u.Email,
--	ua.Country,
--	ua.City,
--	ua.StreetAddress,
--	ua.PostalCode
--from Auth.Users as u
--left join Address.UserAddresses as ua on u.UserId = ua.UserId
--group by 
--	u.UserId, 
--	u.FirstName,
--	u.LastName,
--	u.PhoneNumber,
--	u.Email,
--    ua.Country,
--	ua.City,
--	ua.StreetAddress,
--	ua.PostalCode
--having count(ua.UserId) > 0

-- report: AddressTypesUsage
--select 
--	at.TypeId,
--	at.TypeName,
--	count(ua.TypeId) as UsageAmount
--from Address.AddressTypes as at
--left join Address.UserAddresses as ua 
--	on at.TypeId = ua.TypeId 
--group by at.TypeId, at.TypeName
--order by 
--	case when @OrderBy = 'asc' then count(ua.TypeId) end asc,
--	case when @OrderBy = 'desc' then count(ua.TypeId) end desc

-- #######################################################

create schema Product
go

create view Product.Sellers as
select * from Auth.Users
where RoleId = 2
go

create table Product.Products (
	ProductId int identity(1, 1) primary key,
	SellerId int not null,
	Title varchar(100) not null,
	Price Decimal(18, 2),
	CreatedAt datetime2 default getdate(),
	foreign key (SellerId) references Auth.Users
)
go

insert into Product.Products (SellerId, Title, Price) values
(3,'iPhone 13 Pro', 1200),
(6,'Samsung Galaxy S22', 950),
(10,'Xiaomi Redmi Note 12', 320),
(3,'Lenovo ThinkPad X1', 1500),
(6,'HP Pavilion Laptop', 780),
(10,'Asus ROG Gaming Laptop', 2100),
(3,'Dell UltraSharp Monitor', 420),
(6,'LG 4K Smart TV', 900),
(10,'Sony WH-1000XM5 Headphones', 350),
(3,'Apple AirPods Pro', 260),
(6,'Logitech MX Master Mouse', 120),
(10,'Razer Mechanical Keyboard', 180),
(3,'Samsung 1TB SSD', 140),
(6,'WD External Hard Drive 2TB', 110),
(10,'SanDisk 128GB Flash Drive', 25),
(3,'Canon EOS M50 Camera', 650),
(6,'Nikon D5600 DSLR', 720),
(10,'GoPro Hero 11', 500),
(3,'DJI Mini 3 Drone', 890),
(6,'Apple Watch Series 9', 430),
(10,'Samsung Galaxy Watch 6', 350),
(3,'Fitbit Charge 6', 180),
(6,'Anker Power Bank 20000mAh', 60),
(10,'Belkin Wireless Charger', 45),
(3,'TP-Link WiFi Router AX3000', 130),
(6,'Netgear Nighthawk Router', 220),
(10,'Corsair 16GB RAM Kit', 95),
(3,'Kingston 32GB RAM Kit', 160),
(6,'Nvidia RTX 4070 GPU', 720),
(10,'AMD Radeon RX 7800 XT', 680),
(3,'Intel Core i7 13700K', 410),
(6,'AMD Ryzen 7 7700X', 380),
(10,'Cooler Master CPU Cooler', 75),
(3,'NZXT Gaming Case', 150),
(6,'Seagate 4TB HDD', 130),
(10,'SteelSeries Gaming Headset', 140),
(3,'HyperX Gaming Headset', 120),
(6,'Acer Predator Gaming Monitor', 600),
(10,'Samsung Odyssey G7 Monitor', 650),
(3,'LG Ultrawide Monitor', 520),
(6,'Amazon Echo Dot', 55),
(10,'Google Nest Mini', 50),
(3,'Philips Smart Bulb', 35),
(6,'Xiaomi Smart Home Hub', 80),
(10,'Ring Video Doorbell', 140),
(3,'Arlo Security Camera', 210),
(6,'Dyson V11 Vacuum Cleaner', 690),
(10,'Instant Pot Pressure Cooker', 120),
(3,'Tefal Air Fryer', 170),
(6,'Bosch Coffee Maker', 240);
go

-- #######################################################

create table Product.ProductImages (
	UrlId int identity(1, 1) primary key,
	ProductId int not null,
	UploaderId int not null,
	ImgsUrl varchar(255) not null,
	foreign key (ProductId) references Product.Products(ProductId),
	foreign key (UploaderId) references Auth.Users(UserId)
)
go

insert into Product.ProductImages (ProductId, UploaderId, ImgsUrl) values
(1,3,'img/products/1_1.jpg'),
(2,6,'img/products/2_1.jpg'),
(3,10,'img/products/3_1.jpg'),
(4,3,'img/products/4_1.jpg'),
(5,6,'img/products/5_1.jpg'),
(6,10,'img/products/6_1.jpg'),
(7,3,'img/products/7_1.jpg'),
(8,6,'img/products/8_1.jpg'),
(9,10,'img/products/9_1.jpg'),
(10,3,'img/products/10_1.jpg'),
(11,6,'img/products/11_1.jpg'),
(12,10,'img/products/12_1.jpg'),
(13,3,'img/products/13_1.jpg'),
(14,6,'img/products/14_1.jpg'),
(15,10,'img/products/15_1.jpg'),
(16,3,'img/products/16_1.jpg'),
(17,6,'img/products/17_1.jpg'),
(18,10,'img/products/18_1.jpg'),
(19,3,'img/products/19_1.jpg'),
(20,6,'img/products/20_1.jpg');
go

-- #######################################################

create table Product.Introduction (
	IntroductionId int identity(1, 1) primary key,
	AuthorId int not null,
	ProductId int not null,
	Content varchar(1500),
	CreatedAt datetime2 default getdate(),
	foreign key (ProductId) references Product.Products(ProductId),
	foreign key (AuthorId) references Auth.Users(UserId)
)
go

insert into Product.Introduction (AuthorId, ProductId, Content) values
(3,1,'High quality smartphone with excellent camera and performance suitable for daily use.'),
(6,2,'A modern Android phone offering fast performance and a bright display for multimedia.'),
(10,3,'Affordable smartphone with solid battery life and reliable performance.'),
(3,4,'Professional laptop designed for business users with strong security features.'),
(6,5,'Lightweight laptop perfect for students and everyday productivity tasks.'),
(10,6,'Powerful gaming laptop with advanced graphics and cooling system.'),
(3,7,'High resolution monitor designed for designers and professional workspaces.'),
(6,8,'Large 4K television ideal for home entertainment and streaming.'),
(10,9,'Premium noise cancelling headphones with long battery life.'),
(3,10,'Compact wireless earbuds with immersive sound quality.'),
(6,11,'Ergonomic wireless mouse designed for productivity and comfort.'),
(10,12,'Mechanical gaming keyboard with customizable lighting.'),
(3,13,'Fast solid state drive providing reliable storage and speed.'),
(6,14,'External hard drive with large capacity for backup and storage.'),
(10,15,'Portable USB flash drive ideal for transferring files quickly.'),
(3,16,'Mirrorless camera with excellent video and photography capabilities.'),
(6,17,'DSLR camera offering professional level image quality.'),
(10,18,'Action camera designed for outdoor adventures and sports.'),
(3,19,'Compact drone with intelligent flight modes and stabilized video.'),
(6,20,'Smartwatch with health tracking and smart notifications.'),
(10,21,'Fitness focused smartwatch with durable design and tracking features.'),
(3,22,'Advanced fitness tracker for monitoring daily activities and sleep.'),
(6,23,'High capacity power bank suitable for travel and mobile devices.'),
(10,24,'Wireless charger compatible with most modern smartphones.'),
(3,25,'Reliable WiFi router delivering fast internet across the home.'),
(6,26,'High performance router for gaming and heavy network usage.'),
(10,27,'Memory kit designed to improve PC multitasking performance.'),
(3,28,'High capacity RAM kit for gaming systems and workstations.'),
(6,29,'Modern graphics card capable of handling demanding games.'),
(10,30,'Powerful GPU delivering smooth performance in high resolution gaming.'),
(3,31,'High performance processor suitable for gaming and content creation.'),
(6,32,'Multi core processor designed for demanding workloads.'),
(10,33,'Efficient CPU cooler ensuring stable temperatures during heavy use.'),
(3,34,'Stylish computer case with good airflow and cable management.'),
(6,35,'Large capacity hard drive ideal for storing large media files.'),
(10,36,'Comfortable gaming headset with immersive surround sound.'),
(3,37,'Durable headset designed for long gaming sessions.'),
(6,38,'High refresh rate gaming monitor delivering smooth visuals.'),
(10,39,'Curved gaming monitor with vibrant colors and sharp detail.'),
(3,40,'Ultra wide monitor perfect for multitasking and creative work.'),
(6,41,'Compact smart speaker with voice assistant integration.'),
(10,42,'Smart home speaker providing voice control and automation.'),
(3,43,'Smart bulb allowing remote lighting control and automation.'),
(6,44,'Central hub for managing multiple smart home devices.'),
(10,45,'Smart video doorbell improving home security and monitoring.'),
(3,46,'Wireless security camera with high resolution recording.'),
(6,47,'Cordless vacuum cleaner with strong suction and modern design.'),
(10,48,'Multi functional pressure cooker ideal for fast cooking.'),
(3,49,'Modern air fryer enabling healthier cooking with less oil.'),
(6,50,'Automatic coffee maker delivering fresh coffee quickly.');
go

-- #######################################################

create table Product.Reactions (
	ReactionId int identity(1, 1) primary key,
	ProductId int not null,
	AuthorId int not null,
	Title varchar(50),
	Content varchar(1500),
	ImgUrl varchar(255),
	CreatedAt datetime2 default getdate(),
	foreign key (ProductId) references Product.Products(ProductId),
	foreign key (AuthorId) references Auth.Users(UserId)
)
go

insert into Product.Reactions (ProductId, AuthorId, Title, Content, ImgUrl) values
(1,3,'Excellent Phone','This smartphone works perfectly, fast and reliable for my daily tasks.','img/reactions/1_1.jpg'),
(2,6,'Great Display','The screen quality is amazing with vibrant colors and sharp resolution.','img/reactions/2_1.jpg'),
(3,10,'Value for Money','Affordable device with solid performance. Definitely worth buying.','img/reactions/3_1.jpg'),
(4,3,'Powerful Laptop','Smooth performance, handles heavy tasks and design software easily.','img/reactions/4_1.jpg'),
(5,6,'Lightweight & Portable','Very easy to carry around, battery lasts all day.','img/reactions/5_1.jpg'),
(6,10,'Gaming Beast','Perfect gaming machine with ultra graphics. No lag at all.','img/reactions/6_1.jpg'),
(7,3,'Sharp Monitor','Colors are accurate and display is crisp, perfect for editing work.','img/reactions/7_1.jpg'),
(8,6,'Amazing TV','Beautiful design and excellent 4K clarity. Sound system is good too.','img/reactions/8_1.jpg'),
(9,10,'Superb Headphones','Noise cancellation works great, sound is deep and clear.','img/reactions/9_1.jpg'),
(10,3,'Comfortable Earbuds','Excellent fit, good bass, and easy connection with phone.','img/reactions/10_1.jpg'),
(11,6,'Great Productivity Mouse','Very comfortable for long hours, smooth operation.','img/reactions/11_1.jpg'),
(12,10,'Awesome Keyboard','Love the clicky keys and lighting customization.','img/reactions/12_1.jpg'),
(13,3,'Fast SSD','System boots in seconds, excellent upgrade for performance.','img/reactions/13_1.jpg'),
(14,6,'Reliable HDD','Stores huge files easily, works quietly and efficiently.','img/reactions/14_1.jpg'),
(15,10,'Handy USB Drive','Super fast file transfer, small and convenient size.','img/reactions/15_1.jpg'),
(16,3,'Great Camera','Captures stunning photos with accurate colors. Highly recommend.','img/reactions/16_1.jpg'),
(17,6,'Professional DSLR','Image quality is excellent even in low light conditions.','img/reactions/17_1.jpg'),
(18,10,'Adventure Camera','Compact and tough, great for filming outdoor sports.','img/reactions/18_1.jpg'),
(19,3,'Mini Drone Fun','Stable flight control and good video feedback from the camera.','img/reactions/19_1.jpg'),
(20,6,'Best Smartwatch','Tracks heart rate perfectly and notifications are accurate.','img/reactions/20_1.jpg'),
(21,10,'Cool Fitness Watch','Perfect for workouts, display is bright even under sunlight.','img/reactions/21_1.jpg'),
(22,3,'Useful Tracker','Easy to sync with phone, helps monitor sleep and steps.','img/reactions/22_1.jpg'),
(23,6,'Powerful Powerbank','Charges my mobile several times, great design and durability.','img/reactions/23_1.jpg'),
(24,10,'Fast Charger','Charges phone super quickly with no heating issues.','img/reactions/24_1.jpg'),
(25,3,'Reliable Router','WiFi coverage is wide and stable, simple setup.','img/reactions/25_1.jpg'),
(26,6,'High-End Router','Perfect router for gamers and streaming, no lag issues.','img/reactions/26_1.jpg'),
(27,10,'Good RAM Upgrade','Improved system performance, definitely noticeable.','img/reactions/27_1.jpg'),
(28,3,'Excellent Memory','Fast DDR4 kit, installed without any problem.','img/reactions/28_1.jpg'),
(29,6,'Super GPU','Running all games smoothly at high settings, very happy.','img/reactions/29_1.jpg'),
(30,10,'Powerful Graphics Card','Quiet and efficient, great for video rendering.','img/reactions/30_1.jpg'),
(31,3,'Great CPU','Strong performance even during multitasking sessions.','img/reactions/31_1.jpg'),
(32,6,'Amazing AMD Processor','Handles workloads flawlessly, great temperature control.','img/reactions/32_1.jpg'),
(33,10,'Cooler Works Perfectly','Keeps system cold even while gaming heavily.','img/reactions/33_1.jpg'),
(34,3,'Stylish Case','Good airflow and modern design, cable management is easy.','img/reactions/34_1.jpg'),
(35,6,'Stable Hard Drive','Reliable speed and very quiet operation for daily backups.','img/reactions/35_1.jpg'),
(36,10,'Comfortable Headset','Soft ear cushions and clear sound. Perfect for online meetings.','img/reactions/36_1.jpg'),
(37,3,'Fantastic Headphones','Strong bass and durable build for long gaming sessions.','img/reactions/37_1.jpg'),
(38,6,'Smooth Monitor','Amazing refresh rate, no flickering even at high fps.','img/reactions/38_1.jpg'),
(39,10,'Impressive Curved Monitor','Feels immersive while gaming, color reproduction is excellent.','img/reactions/39_1.jpg'),
(40,3,'Ultra Wide Monitor','Perfect for productivity and video editing.','img/reactions/40_1.jpg'),
(41,6,'Smart Speaker','Responds quickly to commands and connects perfectly.','img/reactions/41_1.jpg'),
(42,10,'Compact and Smart','Easy to use voice assistant, helps control smart devices.','img/reactions/42_1.jpg'),
(43,3,'Great Smart Bulb','Bright and easy to customize with mobile app.','img/reactions/43_1.jpg'),
(44,6,'Smart Hub','Controls all other devices seamlessly, setup was simple.','img/reactions/44_1.jpg'),
(45,10,'Secure Doorbell','Clear video quality and alerts work instantly.','img/reactions/45_1.jpg'),
(46,3,'Reliable Camera','Captures sharp video even at night, great product.','img/reactions/46_1.jpg'),
(47,6,'Vacuum Powerful','Really efficient cleaning, battery life could be better though.','img/reactions/47_1.jpg'),
(48,10,'Perfect Cooker','Fast cooking, easy to clean, very convenient.','img/reactions/48_1.jpg'),
(49,3,'Great Air Fryer','Makes crispy food with less oil, healthier choice.','img/reactions/49_1.jpg'),
(50,6,'Amazing Coffee Maker','Brews fresh aromatic coffee within minutes every morning.','img/reactions/50_1.jpg');
go

-- #######################################################

create table Product.Specification (
	SpecificationId int identity(1, 1) primary key,
	ProductId int not null,
	AuthorId int not null,
	Title varchar(255) not null,
	Content varchar(255) not null,
	CreatedAt datetime2 default getdate(),
	foreign key (ProductId) references Product.Products(ProductId),
	foreign key (AuthorId) references Auth.Users(UserId)
)
go

insert into Product.Specification (ProductId, AuthorId, Title, Content) values
(1,3,'Screen','6.1 inch OLED'),
(1,6,'Battery','4000 mAh'),
(2,10,'CPU','Octa-core 2.4GHz'),
(2,3,'RAM','8 GB'),
(3,6,'Camera','48 MP'),
(3,10,'Storage','128 GB'),
(4,3,'CPU','Intel i7'),
(4,6,'Weight','1.4 kg'),
(5,10,'Display','14 inch IPS'),
(5,3,'Keyboard','Backlit keys'),
(6,6,'GPU','RTX series'),
(6,10,'Cooling','Dual fan'),
(7,3,'Resolution','2560x1440'),
(7,6,'Panel','IPS'),
(8,10,'Size','55 inch'),
(8,3,'HDR','HDR10+'),
(9,6,'Driver','40 mm'),
(9,10,'Bluetooth','v5.2'),
(10,3,'Type','Wireless buds'),
(10,6,'Waterproof','IPX4'),
(11,10,'DPI','6400 DPI'),
(11,3,'Buttons','6 buttons'),
(12,6,'Switch','Blue switch'),
(12,10,'Lighting','RGB'),
(13,3,'Capacity','1 TB'),
(13,6,'Interface','NVMe'),
(14,10,'Capacity','2 TB'),
(14,3,'USB','USB 3.2'),
(15,6,'Capacity','64 GB'),
(15,10,'Speed','120 MB/s'),
(16,3,'Sensor','24 MP'),
(16,6,'Video','4K'),
(17,10,'Lens','Interchangeable'),
(17,3,'Viewfinder','Optical'),
(18,6,'Video','4K 60fps'),
(18,10,'Waterproof','10 m'),
(19,3,'Flight','25 min'),
(19,6,'Range','4 km'),
(20,10,'Display','AMOLED'),
(20,3,'Sensors','HR GPS'),
(21,6,'Battery','7 days'),
(21,10,'Strap','Silicone'),
(22,3,'Tracking','Steps sleep'),
(22,6,'Sync','Mobile app'),
(23,10,'Capacity','20000 mAh'),
(23,3,'Ports','USB-A USB-C'),
(24,6,'Standard','Qi 15W'),
(24,10,'Input','USB-C'),
(25,3,'Band','Dual band'),
(25,6,'Antennas','4 antennas'),
(26,10,'WiFi','WiFi 6'),
(26,3,'LAN','4 ports'),
(27,6,'Kit','16 GB'),
(27,10,'Speed','3200 MHz'),
(28,3,'Capacity','32 GB'),
(28,6,'Timing','CL16'),
(29,10,'Memory','8 GB'),
(29,3,'Ports','HDMI DP'),
(30,6,'Clock','1800 MHz'),
(30,10,'Power','550W PSU'),
(31,3,'Cores','8 cores'),
(31,6,'Socket','AM4'),
(32,10,'TDP','65W'),
(32,3,'Cache','32 MB'),
(33,6,'Type','Air cooler'),
(33,10,'Fan','120 mm'),
(34,3,'Form','ATX'),
(34,6,'Panel','Glass'),
(35,10,'Capacity','4 TB'),
(35,3,'Speed','7200 rpm'),
(36,6,'Mic','Detachable'),
(36,10,'Sound','7.1'),
(37,3,'Jack','3.5 mm'),
(37,6,'Cable','2 m'),
(38,10,'Refresh','165 Hz'),
(38,3,'Response','1 ms'),
(39,6,'Curve','1500R'),
(39,10,'HDR','Supported'),
(40,3,'Ratio','21:9'),
(40,6,'Size','34 inch'),
(41,10,'Voice','Assistant'),
(41,3,'Wireless','WiFi BT'),
(42,6,'Audio','360 sound'),
(42,10,'Size','Compact'),
(43,3,'Base','E27'),
(43,6,'Colors','16M'),
(44,10,'Protocol','Zigbee'),
(44,3,'Control','Mobile'),
(45,6,'Video','1080p'),
(45,10,'Storage','Cloud'),
(46,3,'Night','IR 10m'),
(46,6,'Alert','Motion'),
(47,10,'Battery','Removable'),
(47,3,'Filter','HEPA'),
(48,6,'Capacity','6 L'),
(48,10,'Modes','8 modes'),
(49,3,'Power','1500W'),
(49,6,'Basket','Nonstick'),
(50,10,'Tank','1.2 L'),
(50,3,'Pump','15 bar');
go

-- #######################################################

create table Product.Comments (
	CommentId int identity(1, 1) primary key,
	ProductId int not null,
	AuthorId int not null,
	Score tinyint not null default 0 check (Score between 0 and 5),
	Title varchar(255) not null,
	Content varchar(500) not null,
	CreatedAt datetime2 default getdate(),
	foreign key (ProductId) references Product.Products(ProductId),
	foreign key (AuthorId) references Auth.Users(UserId)
)
go

insert into Product.Comments (ProductId, AuthorId, Score, Title, Content) values
(1,1,5,'Great product','Very satisfied with the quality'),
(1,1,5,'Great product','Very satisfied with the quality'),
(1,2,4,'Good','Works well for daily use'),
(2,4,5,'Excellent','Performance is really impressive'),
(2,4,5,'Excellent','Performance is really impressive'),
(2,4,5,'Excellent','Performance is really impressive'),
(2,5,4,'Nice choice','Worth the price'),
(3,7,5,'Amazing','Camera quality is fantastic'),
(3,7,5,'Amazing','Camera quality is fantastic'),
(3,7,5,'Amazing','Camera quality is fantastic'),
(3,7,5,'Amazing','Camera quality is fantastic'),
(3,8,3,'Average','Not bad but could improve'),
(4,9,4,'Solid device','Runs smoothly overall'),
(4,1,5,'Perfect','Exactly what I needed'),
(5,2,4,'Good laptop','Light and fast'),
(5,4,3,'Decent','Battery could be better'),
(6,5,5,'Powerful','Handles heavy tasks easily'),
(6,7,4,'Good performance','Gaming works great'),
(7,8,4,'Sharp display','Image quality is clear'),
(7,9,3,'Okay','Good but not perfect'),
(8,1,5,'Excellent TV','Colors are vibrant'),
(8,2,4,'Nice screen','Great for movies'),
(9,4,4,'Comfortable','Sound quality is nice'),
(9,5,3,'Normal','Expected better bass'),
(10,7,5,'Love it','Very convenient earbuds'),
(10,8,4,'Good sound','Battery lasts long'),
(11,9,4,'Smooth','Cursor movement is precise'),
(11,1,3,'Okay mouse','Buttons feel average'),
(12,2,5,'Great keyboard','Typing feels great'),
(12,4,4,'Nice switches','Very responsive'),
(13,5,5,'Fast SSD','Loads files instantly'),
(13,7,4,'Reliable','Good storage option'),
(14,8,4,'Good drive','Plenty of space'),
(14,9,3,'Average speed','Works fine'),
(15,1,4,'Useful','Portable and handy'),
(15,2,3,'Okay','Speed is moderate'),
(16,4,5,'Fantastic camera','Photos look amazing'),
(16,5,4,'Great shots','Very sharp images'),
(17,7,4,'Nice DSLR','Good for beginners'),
(17,8,3,'Decent','Learning curve exists'),
(18,9,5,'Great action cam','Stabilization is good'),
(18,1,4,'Nice video','Clear footage'),
(19,2,4,'Fun drone','Easy to control'),
(19,4,3,'Okay flight','Battery is short'),
(20,5,5,'Love this watch','Tracks everything well'),
(20,7,4,'Nice smartwatch','Good features'),
(21,8,4,'Comfortable','Strap feels nice'),
(21,9,3,'Average','Battery drains fast'),
(22,1,4,'Helpful tracker','Good fitness data'),
(22,2,3,'Basic','Simple but useful'),
(23,4,5,'Great power bank','Charges very fast'),
(23,5,4,'Reliable','Good capacity'),
(24,7,4,'Convenient','Wireless charging works'),
(24,8,3,'Slow charge','Expected faster'),
(25,9,4,'Stable router','Signal is strong'),
(25,1,5,'Excellent WiFi','Coverage is great'),
(26,2,5,'Fast network','WiFi 6 works great'),
(26,4,4,'Good router','Setup was simple'),
(27,5,4,'Great RAM','System feels faster'),
(27,7,3,'Okay memory','Works as expected'),
(28,8,5,'Excellent kit','Very stable performance'),
(28,9,4,'Good upgrade','Worth buying'),
(29,1,5,'Strong GPU','Gaming performance is high'),
(29,2,4,'Nice graphics','Runs games smoothly'),
(30,4,4,'Good card','Handles most games'),
(30,5,3,'Average GPU','Gets a bit hot'),
(31,7,5,'Powerful CPU','Great multitasking'),
(31,8,4,'Fast processor','Very responsive'),
(32,9,4,'Efficient','Low power usage'),
(32,1,3,'Normal CPU','Works fine'),
(33,2,4,'Cooler works','Temperatures stay low'),
(33,4,3,'Decent cooler','Installation easy'),
(34,5,5,'Beautiful case','Great airflow'),
(34,7,4,'Nice design','Looks premium'),
(35,8,4,'Large storage','Good for backups'),
(35,9,3,'Average HDD','Noise is noticeable'),
(36,1,5,'Great headset','Sound is immersive'),
(36,2,4,'Nice mic','Voice is clear'),
(37,4,4,'Comfortable headset','Lightweight design'),
(37,5,3,'Okay audio','Bass is weak'),
(38,7,5,'Amazing monitor','Super smooth display'),
(38,8,4,'Good refresh','Gaming feels great'),
(39,9,4,'Nice curve','Immersive screen'),
(39,1,3,'Okay monitor','Color is average'),
(40,2,4,'Wide screen','Good for multitasking'),
(40,4,5,'Excellent ultrawide','Great workspace'),
(41,5,4,'Smart speaker','Voice commands work'),
(41,7,3,'Average speaker','Sound is okay'),
(42,8,4,'Nice sound','Compact but loud'),
(42,9,3,'Decent','Bass could improve'),
(43,1,4,'Fun lighting','Colors look great'),
(43,2,3,'Okay bulb','App sometimes slow'),
(44,4,4,'Smart control','Easy automation'),
(44,5,3,'Works fine','Setup took time'),
(45,7,5,'Great camera','Clear security video'),
(45,8,4,'Reliable','Good motion alerts'),
(46,9,4,'Good night vision','Works in dark'),
(46,1,3,'Okay cam','App is basic'),
(47,2,4,'Useful device','Easy to maintain'),
(47,4,3,'Average','Battery life medium'),
(48,5,5,'Excellent cooker','Food cooks fast'),
(48,7,4,'Good appliance','Very practical'),
(49,8,4,'Nice fryer','Crispy results'),
(49,9,3,'Okay fryer','Cleaning is hard'),
(50,1,5,'Great coffee','Brews quickly'),
(50,2,4,'Nice machine','Good pressure');
go

-- #######################################################

create table Product.CommentImages (
	UrlId int identity(1, 1) primary key,
	CommentId int not null,
	UploaderId int not null,
	ImgUrl varchar(255) not null,
	foreign key (CommentId) references Product.Comments(CommentId),
	foreign key (UploaderId) references Auth.Users(UserId)
)
go

insert into Product.CommentImages (CommentId, UploaderId, ImgUrl) values
(2,1,'img/comments/img02.jpg'),
(4,4,'img/comments/img04.jpg'),
(6,5,'img/comments/img06.jpg'),
(8,7,'img/comments/img08.jpg'),
(10,8,'img/comments/img10.jpg'),
(12,9,'img/comments/img12.jpg'),
(14,1,'img/comments/img14.jpg'),
(16,2,'img/comments/img16.jpg'),
(18,4,'img/comments/img18.jpg'),
(20,5,'img/comments/img20.jpg'),
(22,7,'img/comments/img22.jpg'),
(24,8,'img/comments/img24.jpg'),
(26,9,'img/comments/img26.jpg'),
(28,1,'img/comments/img28.jpg'),
(30,2,'img/comments/img30.jpg'),
(32,4,'img/comments/img32.jpg'),
(34,5,'img/comments/img34.jpg'),
(36,7,'img/comments/img36.jpg'),
(38,8,'img/comments/img38.jpg'),
(40,9,'img/comments/img40.jpg'),
(42,1,'img/comments/img42.jpg'),
(44,2,'img/comments/img44.jpg'),
(46,4,'img/comments/img46.jpg'),
(48,5,'img/comments/img48.jpg'),
(50,7,'img/comments/img50.jpg'),
(52,8,'img/comments/img52.jpg'),
(54,9,'img/comments/img54.jpg'),
(56,1,'img/comments/img56.jpg'),
(58,2,'img/comments/img58.jpg'),
(60,4,'img/comments/img60.jpg');
go

-- #######################################################

create table Product.CommentReactionTypes (
	ReactionTypeId tinyint identity(1, 1) primary key,
	Name varchar(50) not null
)
go

insert into Product.CommentReactionTypes(Name)
values ('Like'), ('dislike')
go

-- #######################################################

create table Product.CommentReactions (
	ReactionId int identity(1, 1) primary key,
	CommentId int not null,
	AuthorId int not null,
	ReactionTypeId tinyint not null,
	foreign key (CommentId) references Product.Comments(CommentId) on delete cascade,
	foreign key (AuthorId) references Auth.Users(UserId),
	foreign key (ReactionTypeId) references Product.CommentReactionTypes(ReactionTypeId)
)
go

create unique index UX_CommentReactions_UserComment
on Product.CommentReactions (CommentId, AuthorId)
go

insert into Product.CommentReactions (CommentId, AuthorId, ReactionTypeId) values
(1,2,1),
(2,4,2),
(3,5,1),
(4,7,2),
(5,8,1),
(6,9,2),
(7,1,1),
(8,2,2),
(9,4,1),
(10,5,2),
(11,7,1),
(12,8,2),
(13,9,1),
(14,1,2),
(15,2,1),
(16,4,2),
(17,5,1),
(18,7,2),
(19,8,1),
(20,9,2),
(21,1,1),
(22,2,2),
(23,4,1),
(24,5,2),
(25,7,1),
(26,8,2),
(27,9,1),
(28,1,2),
(29,2,1),
(30,4,2),
(31,5,1),
(32,7,2),
(33,8,1),
(34,9,2),
(35,1,1),
(36,2,2),
(37,4,1),
(38,5,2),
(39,7,1),
(40,8,2),
(41,9,1),
(42,1,2),
(43,2,1),
(44,4,2),
(45,5,1),
(46,7,2),
(47,8,1),
(48,9,2),
(49,1,1),
(50,2,2);
go

-- #######################################################

-- report: TopSellers
--select top 10
--	au.UserId,
--	(au.FirstName + ' ' + au.LastName) as SellerFullName,
--	au.Email,
--	count(au.UserId) as TotalProducts
--from Product.Products as pp
--inner join Auth.Users as au on pp.SellerId = au.UserId
--where au.Firstname like '%' + @FirstName + '%'
--and au.Lastname like '%' + @LastName + '%'
--group by au.UserId, au.FirstName, au.LastName, au.Email
--order by count(*) desc

-- report: ProductRatingSummary
--select 
--	pp.ProductId,
--	pp.Title as ProductTitle,
--	(au.FirstName + ' ' + au.LastName) as SellerName,
--	count(pc.CommentId) as TotalComments,
--    cast(AVG(pc.Score * 1.0) as decimal(4, 2)) as AvgScore
--from Product.Products as pp
--left join Auth.Users as au on pp.SellerId = au.UserId
--inner join Product.Comments as pc on pp.ProductId = pc.ProductId
--group by pp.ProductId , pp.Title, au.FirstName, au.LastName
--having count(pc.CommentId) >= 2
--and AVG(pc.Score * 1.0) between 0 and 5
--order by AvgScore desc, TotalComments desc

-- report: TopProductPerSeller
--;with RankedProducts as (
--	select
--		au.UserId as SellerId,
--		(au.FirstName + ' ' + au.LastName) as SellerName,
--		pp.ProductId,
--		pp.Title as ProductTitle,
--		AVG(pc.Score * 1.0) AS AvgScore,
--		count(pc.CommentId) as TotalComments,
--		ROW_NUMBER() OVER (PARTITION BY au.UserId ORDER BY AVG(pc.Score) DESC, COUNT(pc.CommentId) DESC) AS Rank
--	from Auth.Users as au
--	left join Product.Products as pp on au.UserId = pp.SellerId
--	left join Product.Comments as pc on pp.ProductId = pc.ProductId
--	where RoleId = 2
--	group by au.UserId, au.FirstName, au.LastName, pp.ProductId, pp.Title
--)
--select SellerId, SellerName, ProductId, ProductTitle, TotalComments from RankedProducts
--where Rank = 1

-- report: MostExpensiveProductPerSeller
--declare @ShowSellersWithProduct bit = 0;
--with SellerUsers as (
--	select * from Auth.Users
--	where RoleId = 2 -- seller id
--), RankedUsers as (
--	select 
--		su.UserId as SellerId,
--		(su.FirstName + ' ' + su.LastName) as SellerName,
--		pp.Title,
--		pp.Price,
--		ROW_NUMBER() over (
--			partition by su.UserId
--			order by pp.Price desc
--		) as Rank
--	from SellerUsers as su
--	left join Product.Products as pp on  su.UserId = pp.SellerId
--)
--select 
--	SellerId,
--	SellerName,
--	Title,
--	Price
--from RankedUsers
--where Rank = 1 and (@ShowSellersWithProduct = 0 or Price is not null)
--order by Price desc

-- report: CheapestProductPerSeller
--declare @ShowSellersWithProduct bit = 1;
--with SellerUsers as (
--	select * from Auth.Users
--	where RoleId = 2
--), CheapestProduct as (
--	select 
--		su.UserId as SellerId,
--		(su.FirstName + ' ' + su.LastName) as SellerName,
--		su.Email,
--		p.Title,
--		p.Price
--	from SellerUsers as su
--	outer apply (
--		select 
--			top 1
--			Title,
--			Price
--		from Product.Products as pp
--		where su.UserId = pp.SellerId
--		order by pp.Price asc
--	) as p
--	where (@ShowSellersWithProduct = 0 or p.Price is not null)
--)
--select * from CheapestProduct

-- #######################################################

create table Product.Categories (
	CategoryId int identity(1, 1) primary key,
	Title varchar(100) not null,
	CreatedAt datetime2 default getdate(),
)
go

insert into Product.Categories (Title)
values ('Electronics'), ('Home Appliances'),
('Toys & Kids'), ('Fashion'), ('Beauty & Personal Care'),
('Sports & Outdoors'), ('Automotive'), ('Books & Media'),
('Office Supplies'), ('Groceries'), ('Pet Supplies'),
('Uncategorized');
go

-- #######################################################

alter table Product.Products
add CategoryId int null,
foreign key (CategoryId) references Product.Categories(CategoryId)
go

update Product.Products
set CategoryId = 
	case 
		when Title like '%iphone%' or Title like '%samsung%' then 1
		when Title like '%lenovo%' or Title like '%HP%' then 1
		when Title like '%asus%' or Title like '%dell%' then 1
		when Title like '%LG%' or Title like '%anker%' then 1
		when Title like '%xiaomi%' or Title like '%sony%' then 1
		else 1
	end 
where CategoryId is null
go

-- #######################################################

create schema Stock
go

create table Stock.CurrentStock (
	StockId int identity(1, 1) primary key,
	ProductId int not null unique,
	Amount int not null check (Amount >= 0),
	LastUpdate datetime2 default getdate() not null,
	foreign key (ProductId) references Product.Products(ProductId)
)
go 

create table Stock.StockHistory (
	StockHistoryId int identity(1, 1) primary key,
	ProductId int not null,
	AuthorId int not null,
	Amount int not null check (Amount >= 0),
	CreatedAt datetime2 default getdate() not null,
	foreign key (ProductId) references Product.Products(ProductId),
	foreign key (AuthorId) references Auth.Users(UserId)
)
go

create index IX_StockHistory_ProductId
on Stock.StockHistory(ProductId)
include (AuthorId)
go

-- #######################################################

create procedure Stock.ManageStock
	@ProductId int,
	@Amount int,
	@AuthorId int
as
begin
    set nocount on;

	begin try
		begin tran
		-- 1) update
		update Stock.CurrentStock
		set amount = @amount,
			LastUpdate = getdate()
		where ProductId = @ProductId

		-- 2) check rows affected then
		--    INSERT if needed
		if @@ROWCOUNT = 0
		begin
			insert into Stock.CurrentStock (ProductId, amount)
			values (@ProductId, @Amount)
		end

		insert into Stock.StockHistory (ProductId, AuthorId, amount)
		values (@ProductId, @AuthorId, @Amount)

		commit;
	end try
	begin catch
		if XACT_STATE() <> 0
			rollback tran
		throw
	end catch
end
go

declare @i int = 1
while @i <= 150
begin
    declare @ProductId int =
    (select top 1 ProductId from Product.Products order by newid()) -- select a random ProductId

    declare @AuthorId int =
    (
		select top 1 UserId from Auth.Users 
		where RoleId in (2, 3, 4)
		order by newid()
	) -- select a random AuthorId

    declare @Amount int =
    abs(checksum(newid())) % 200 + 1

    exec Stock.ManageStock
        @ProductId,
        @Amount,
        @AuthorId

    set @i = @i + 1
end
go

-- #######################################################

create schema Sales
go

create table Sales.OrderStates (
	StateId tinyint identity(1, 1) primary key,
	Title varchar(50) not null unique,
	CreatedAt datetime2 default sysdatetime()
)
go

insert into Sales.OrderStates (Title) 
values 
('paid'), ('processing'), ('shipped'),
('delivered'), ('cancelled'), ('returned')
go

create table Sales.Orders (
	OrderId int identity(1, 1) primary key,
	UserId int not null,
	StateId tinyint not null,
	TotalPrice bigint not null default 0 check (TotalPrice >= 0),
	CreatedAt datetime2 default sysdatetime(),
	PaidAt datetime2,
	ShippedAt datetime2,
	DeliveredAt datetime2,
	CancelledAt datetime2,
	UpdatedAt datetime2 default sysdatetime(),
	foreign key (UserId) references Auth.Users(UserId),
	foreign key (StateId) references Sales.OrderStates(StateId)
)
go

create index IX_Orders_StateId
on Sales.Orders (StateId)
go

create index IX_Orders_UserId
on Sales.Orders (UserId)
go

create table Sales.Items (
	ItemId int identity(1, 1) primary key,
	OrderId int not null,
	ProductId int not null,
	Quantity smallint not null check (Quantity > 0),
	Price bigint not null check (Price >= 0),
	TotalPrice as (Quantity * Price) persisted,
	foreign key (OrderId) references Sales.Orders(OrderId),
	foreign key (ProductId) references Product.Products(ProductId)
)
go

create unique index IX_Items_Order_Product
on Sales.Items (OrderId, ProductId)
go

create index IX_Items_ProductId
on Sales.Items (ProductId)
go

create index IX_Items_OrderId
on Sales.Items (OrderId)
go

-- #######################################################

create trigger AutoDateUpdate
on Sales.Orders after update
as
begin
	set nocount on;
	
	update o
	set o.UpdatedAt = sysdatetime()
	from Sales.Orders as o
	join inserted as i
	on o.OrderId = i.OrderId
end
go

create trigger CalcOrderTotalPrice
on Sales.Items
after insert, update, delete
as
begin
    set nocount on;

	with ChangedOrders as (
		select OrderId from inserted
		union
		select OrderId from deleted
	)

	update o
	set o.TotalPrice = isnull(s.SumPrice, 0)
	from Sales.Orders as o
	join ChangedOrders as c on o.OrderId = c.OrderId
	left join (
		select 
			OrderId,
			sum(TotalPrice) as SumPrice
		from Sales.Items
		where OrderId in (select OrderId from ChangedOrders)
		group by OrderId
	) s on s.OrderId = o.OrderId
end
go

create trigger Sales.CheckItemsAmount
on Sales.Items
instead of insert, update
as
begin
    set nocount on;

	if exists (
		select 
			1
		from inserted as i
		left join Stock.CurrentStock as sc on i.ProductId = sc.ProductId
		where i.Quantity > isnull(sc.Amount, 0)
	)
	begin
        throw 51001, N'Quantity exceeds available stock!', 1;
        return;
	end

	if exists (select 1 from deleted)
	begin
		delete si
		from Sales.Items as si
		join deleted as d on si.ItemId = d.ItemId		
	end

	insert into Sales.Items (OrderId, ProductId, Quantity, Price)
	select 
		OrderId, ProductId, Quantity, Price
	from inserted
end
go

-- #######################################################

create type Sales.OrderItemListType as table (
	ProductId int not null,
	Quantity smallint not null check (Quantity > 0),
	Price bigint not null check (Price >= 0)
)
go

create procedure Sales.PlaceAnOrder
	@UserId int,
	@OrderItemList Sales.OrderItemListType readonly
as
begin
    set nocount on;

	declare @OrderId int;

	insert into Sales.Orders (UserId, StateId)
	values (@UserId, (select StateId from Sales.OrderStates where Title = 'processing'))

	set @OrderId = SCOPE_IDENTITY()

	insert into Sales.Items (OrderId, ProductId, Quantity, Price)
	select @OrderId, ProductId, Quantity, Price from @OrderItemList
end
go

declare @i int = 1
while @i <= 10
begin
    declare @OrderItemList Sales.OrderItemListType;
	declare @UserId int = 
		(
			select top 1 UserId 
			from Auth.Users 
			where RoleId = (select RoleId from Auth.Roles where RoleName = 'Customer')
			order by newid()
		) -- select a random UserId
	
	declare @j int = 1
	while @j <= 4
	begin
		declare @ProductId int,
				@Quantity smallint,
				@Price bigint;

		select top 1 
			@ProductId = ProductId,
			@Price = Price,
			@Quantity = floor(rand() * 2) + 1
		from Product.Products as pp
	    where pp.ProductId not in (select ProductId from @OrderItemList)
		order by newid() -- select a random product

		insert into @OrderItemList (ProductId, Quantity, Price)
		values (@ProductId, 2, @Price)

		set @j = @j + 1
	end

	exec Sales.PlaceAnOrder @UserId, @OrderItemList
	set @i = @i + 1
end
go

-- #######################################################

create schema Cart
go

create table Cart.ShoppingCart (
	CartId int identity(1, 1) primary key,
	UserId int unique not null,
	TotalPrice bigint not null default 0 check (TotalPrice >= 0),
	CreatedAt datetime2 default sysdatetime(),
	UpdatedAt datetime2 default sysdatetime(),
	foreign key (UserId) references Auth.Users(UserId)
)
go

create index IX_ShoppingCart_UserId
on Cart.ShoppingCart (UserId)
go

create table Cart.Items (
	ItemId int identity(1, 1) primary key,
	CartId int not null,
	ProductId int not null,
	Quantity smallint not null check (Quantity > 0),
	Price bigint not null check (Price >= 0),
	TotalPrice as (Quantity * Price) persisted,
	foreign key (CartId) references Cart.ShoppingCart(CartId),
	foreign key (ProductId) references Product.Products(ProductId)
)
go

create unique index IX_Items_Cart_Product
on Cart.Items (CartId, ProductId)
go

create index IX_Items_ProductId
on Cart.Items (ProductId)
go

create index IX_Items_CartId
on Cart.Items (CartId)
go

-- #######################################################

create trigger AutoDateUpdate
on Cart.ShoppingCart after update
as
begin
	set nocount on;
	
	update sc
	set sc.UpdatedAt = sysdatetime()
	from Cart.ShoppingCart as sc
	join inserted as i
	on sc.CartId = i.CartId
end
go

create trigger CalcOrderTotalPrice
on Cart.Items
after insert, update, delete
as
begin
    set nocount on;

	with ChangedCarts as (
		select CartId from inserted
		union
		select CartId from deleted
	)

	update o
	set o.TotalPrice = isnull(s.SumPrice, 0)
	from Cart.ShoppingCart as o
	join ChangedCarts as c on o.CartId = c.CartId
	left join (
		select 
			CartId,
			sum(TotalPrice) as SumPrice
		from Cart.Items
		where CartId in (select CartId from ChangedCarts)
		group by CartId
	) s on s.CartId = o.CartId
end
go

************************************************************/
-- #######################################################

create procedure Cart.AddToCart
	@UserId int not null,
	@ProductId int not null,
	@Quantity int not null
as
begin
    set nocount on;
	
	declare @ProductPrice bigint;

	select @ProductPrice = Price
	from Product.Products
	where ProductId = @ProductId

	if @ProductPrice is null
	begin
		throw 50001, 'Product not found', 1;
	end

	if exists (select 1 from Cart.ShoppingCart where UserId = @UserId)
	begin
		declare @CartId int = (select CartId from Cart.ShoppingCart where UserId = @UserId)
		
		if exists (
			select 1 from Cart.Items 
			where CartId = @CartId and ProductId = @ProductId
		)
		begin
			update Cart.Items
			set Quantity = @Quantity
			where CartId = @CartId and ProductId = @ProductId
		end
		else
		begin
		end
	end
	else 
	begin
		declare @CartId int;
		
		insert into Cart.ShoppingCart (UserId)
		values (@UserId)

		set @CartId = SCOPE_IDENTITY()

		insert into Cart.Items (CartId, ProductId, Quantity, Price)
		values (@CartId, @ProductId, @Quantity, @ProductPrice)
	end
end
go

-- #######################################################
declare @i int = 1
while @i <= 10
begin
    declare @OrderItemList Sales.OrderItemListType;
	declare @UserId int = 
		(
			select top 1 UserId 
			from Auth.Users 
			where RoleId = (select RoleId from Auth.Roles where RoleName = 'Customer')
			order by newid()
		) -- select a random UserId
	
	declare @j int = 1
	while @j <= 4
	begin
		declare @ProductId int,
				@Quantity smallint,
				@Price bigint;

		select top 1 
			@ProductId = ProductId,
			@Price = Price,
			@Quantity = floor(rand() * 2) + 1
		from Product.Products as pp
	    where pp.ProductId not in (select ProductId from @OrderItemList)
		order by newid() -- select a random product

		insert into @OrderItemList (ProductId, Quantity, Price)
		values (@ProductId, 2, @Price)

		set @j = @j + 1
	end

	exec Sales.PlaceAnOrder @UserId, @OrderItemList
	set @i = @i + 1
end
go


create procedure Sales.PlaceAnOrder
	@UserId int,
	@OrderItemList Sales.OrderItemListType readonly
as
begin
    set nocount on;

	declare @OrderId int;

	insert into Sales.Orders (UserId, StateId)
	values (@UserId, (select StateId from Sales.OrderStates where Title = 'processing'))

	set @OrderId = SCOPE_IDENTITY()

	insert into Sales.Items (OrderId, ProductId, Quantity, Price)
	select @OrderId, ProductId, Quantity, Price from @OrderItemList
end
go