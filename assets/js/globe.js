/**
 * Artur Sucila — Interactive 3D WebGL Earth Globe & Live Geodesic Ping Engine
 * - Real Natural Earth continent coastlines + 10,000-node Fibonacci land dot-matrix
 * - High-definition highlighted Norway border polygon & Oslo HQ beacon (59.91°N, 10.75°E)
 * - Live visitor IP geolocation + real HTTP RTT network ping measurement
 * - Great-circle 3D geodesic telemetry arc with animated ping packets
 * - Real-time 3D-to-2D projected floating pin labels & finger-drag inertia physics
 */

const FIB_COUNT = 10000;
const LAND_MASK_B64 = "AAAAAAIAQgAICKEJISGgBISAAJwRAANAYAROzIAZODMSR3LMaBn5tbP99LWP9t7bnvv7f3vqbW/tv7u19f7n9tTf2trbU3v7b03t/bk9Nfen1vbcmJq7U3pqTkzLmTk3JXen5MScm5I7c35CzszLnTk/I2fm7ZScnZezc35Ozs7ZWTk/L2fn7KycnbezcnZOzs7JeTk5Z2fl5KycnbOzcnJezsrJeTk7J2fl5KycnZOzcnZczMrJWTE7Jmfl5KyYlZPzYnJUzMjJeTExK2fE5KiYkZczcnJWzsrJGTkxK2bkxKickJVzMmJWzsiJETkpK2ZkxKiclJNzckJWzMqIOTEhJ2ZlhJyYlRHzckJGzMoIeTEhI2bFhLyYlBGyYlJWzMoIWTEpI2fFpKyclBGyclJWyspJWTkpIyXlpKSclJGCclJSyopJSTkpIyXlpKSclZGSclJSSspJSSkpKwXlpKQUFJGSUlBSCspBSSkoKiWloKSUlIGSUlBWSspASSkrAiWloKSUlYGSUhZUykpASQkJA2UlICyUlIGSEhIWykpASQkJQ2UlICiUlKCSEhIOykpAUCgJAWUlICyUhICiUhACykpAQCgLASElIDSUhYCAUBQCykpASCgKAQGlIAQUlICQUBQCQkpASAgIASGhIAQUlICQUBCCAkpACAoJASGpKASFlIBQFBKCQlJQCCoJQSEpIASFpKAQFFKCQlNACApJASEoIASFpIAQVFKCQlFAKApJASCoIAWFoAAQFIICQlAAKipBASCoABWBoAAUVIICQFABKgpBASCoABWBoABUFIAKQFABKgJBASgoABWBoAJUFIACUFAhKgJBASgoABWhoAJUFIACUFEAKkJBhSgoEQWiokAUhIgCUVACCkZBhSgIAQWiogQUjIAKUHACCkZBiSgYARWioARUjIICUBACKkRBCagYAQWiIAQUiIICUDACCkBBCSgIFQWgYAQUgIICUBACCkBBCSgABQWgIAQUgIICURAKCkBBCCgQBYWiIAQUgIICUQAKCkBBCCgABYWiAEQUgIISUSAKCkQBiCgABYWiQEQUiAJSUSAKCkUBiCgQBYSiQEQUiAIQUSACCkWBiCgQBYCiQEQUiAIRUSAqCEWBiCgQFYKiQEQUiAoRUSAqAEWBiCgQFQKiQFQUiAIBUSAqBEWBgCgQFQKiQEQMiAIBUSAqBESBiCgQBQKiQEQIiAIBUSAqBESBiBgQBQKiQEQIiAIBESAKBESBiBgQBQKiQEQIiAIBESAKBESBgBAABQIiQAQIgAIBEQACBEABgBAAAQIgAAAIgAABEAACBEAAABAAAQIgAAQIgAAAEAACBEAAAAAAAQAgAAAAgQAAAAAAAEAAAAAAAAAgAAAAgAAAIAAAgEAAAAAAAQAAAAAAgAAAAAAAAEAAAAAAAEAgAAAAgAAAAAAAAEAAAAAAAQAgAAAAgAAAAAAAAEAAAAAAAAAAAAAAgAAQAAAAAAAAAAAAAQAAAAAAgAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
const COAST_RINGS = [[[-782,83],[-796,89],[-805,81],[-800,75],[-809,72],[-811,78],[-835,84],[-850,101],[-851,96],[-857,99],[-857,111],[-875,133],[-912,139],[-947,162],[-966,157],[-1035,183],[-1055,199],[-1053,214],[-1060,228],[-1122,290],[-1131,312],[-1148,318],[-1147,302],[-1094,232],[-1100,228],[-1122,247],[-1123,260],[-1151,277],[-1142,286],[-1155,296],[-1173,330],[-1206,346],[-1244,403],[-1239,455],[-1247,482],[-1231,480],[-1226,471],[-1228,490],[-1256,504],[-1274,508],[-1279,523],[-1291,528],[-1341,581],[-1471,609],[-1482,607],[-1480,600],[-1517,592],[-1506,613],[-1540,594],[-1533,589],[-1542,581],[-1584,560],[-1648,544],[-1577,576],[-1570,589],[-1620,587],[-1619,596],[-1625,600],[-1653,605],[-1661,615],[-1657,621],[-1646,631],[-1608,638],[-1615,644],[-1608,648],[-1650,644],[-1681,657],[-1645,666],[-1617,661],[-1668,684],[-1619,703],[-1566,714],[-1365,689],[-1298,702],[-1291,698],[-1281,705],[-1258,695],[-1244,702],[-1243,694],[-1215,698],[-1139,684],[-1153,679],[-1099,680],[-1089,674],[-1078,679],[-1088,683],[-1082,687],[-1015,676],[-984,678],[-986,684],[-977,686],[-961,682],[-961,673],[-942,691],[-965,701],[-964,712],[-939,718],[-915,702],[-924,697],[-905,695],[-906,685],[-892,693],[-880,686],[-883,679],[-874,672],[-856,688],[-855,699],[-826,697],[-812,687],[-820,681],[-814,671],[-858,666],[-873,648],[-907,636],[-908,630],[-919,628],[-942,609],[-947,589],[-932,588],[-923,571],[-909,573],[-850,553],[-823,551],[-821,533],[-799,512],[-786,526],[-798,547],[-765,565],[-785,588],[-773,599],[-781,623],[-738,624],[-714,611],[-696,611],[-693,590],[-676,582],[-646,603],[-614,570],[-618,563],[-573,546],[-558,533],[-557,521],[-600,502],[-664,502],[-711,468],[-686,483],[-651,492],[-642,487],[-651,481],[-645,462],[-632,457],[-615,459],[-605,470],[-598,459],[-654,435],[-661,436],[-662,445],[-644,453],[-671,451],[-706,431],[-708,423],[-700,416],[-737,409],[-719,409],[-740,408],[-749,389],[-755,395],[-751,384],[-759,372],[-764,391],[-763,381],[-770,382],[-763,379],[-757,356],[-813,314],[-801,269],[-804,252],[-817,259],[-837,299],[-851,296],[-864,304],[-896,302],[-894,292],[-938,297],[-974,274],[-979,224],[-959,188],[-944,181],[-914,189],[-903,210],[-871,215],[-889,159],[-850,160],[-834,153],[-838,111],[-822,90],[-796,96],[-768,86],[-749,111],[-734,112],[-718,124],[-711,121],[-719,114],[-717,91],[-710,99],[-714,110],[-702,114],[-699,122],[-682,106],[-649,101],[-619,107],[-627,104],[-624,99],[-608,94],[-607,86],[-591,80],[-571,60],[-540,58],[-513,42],[-500,17],[-507,2],[-486,-2],[-486,-12],[-478,-6],[-449,-16],[-446,-27],[-400,-29],[-352,-55],[-351,-90],[-387,-131],[-393,-179],[-409,-219],[-420,-230],[-446,-234],[-476,-249],[-485,-259],[-489,-287],[-538,-344],[-562,-349],[-584,-339],[-568,-369],[-577,-382],[-592,-387],[-623,-388],[-621,-407],[-627,-410],[-651,-411],[-650,-421],[-635,-426],[-652,-435],[-656,-450],[-673,-456],[-676,-463],[-656,-472],[-660,-481],[-691,-507],[-681,-523],[-695,-523],[-708,-529],[-710,-538],[-749,-523],[-756,-487],[-741,-469],[-756,-466],[-744,-441],[-732,-445],[-727,-424],[-734,-421],[-737,-434],[-743,-432],[-732,-393],[-736,-372],[-714,-324],[-702,-198],[-704,-183],[-715,-174],[-760,-146],[-798,-72],[-812,-61],[-814,-47],[-798,-27],[-810,-22],[-809,-11],[-801,8],[-789,14],[-771,38],[-782,83]],[[-806,231],[-742,203],[-778,199],[-771,204],[-787,216],[-822,224],[-818,226],[-850,219],[-833,230],[-806,231]],[[-1284,508],[-1258,503],[-1235,485],[-1257,488],[-1281,500],[-1284,508]],[[-831,641],[-855,631],[-859,636],[-872,635],[-864,640],[-859,657],[-801,637],[-831,641]],[[-1726,645],[-1784,654],[-1787,661],[-1799,659],[-1794,654],[-1800,650],[-1800,690],[-1749,672],[-1743,663],[-1746,671],[-1719,669],[-1699,660],[-1725,654],[-1726,645]],[[-1021,691],[-1133,685],[-1173,700],[-1124,704],[-1179,705],[-1184,709],[-1161,713],[-1194,716],[-1179,727],[-1152,733],[-1142,731],[-1147,727],[-1099,730],[-1082,717],[-1077,721],[-1084,731],[-1075,732],[-1054,727],[-1045,710],[-1010,700],[-1027,695],[-1021,691]],[[-967,717],[-993,714],[-1025,728],[-1004,727],[-1015,734],[-1004,738],[-974,738],[-981,730],[-965,726],[-967,717]],[[-1205,714],[-1231,709],[-1259,719],[-1239,737],[-1249,743],[-1176,742],[-1155,735],[-1192,725],[-1205,714]],[[-960,729],[-945,741],[-905,739],[-943,720],[-954,721],[-960,729]],[[-1139,747],[-1118,752],[-1177,752],[-1154,765],[-1091,755],[-1105,764],[-1096,768],[-1057,755],[-1122,744],[-1139,747]],[[-971,768],[-916,768],[-892,756],[-811,757],[-798,749],[-882,744],[-924,748],[-929,759],[-971,768]],[[-1026,763],[-985,767],[-977,757],[-982,750],[-998,749],[-1009,751],[-1009,756],[-1025,756],[-1026,763]],[[-1163,769],[-1215,759],[-1229,761],[-1191,775],[-1162,776],[-1163,769]],[[-1042,787],[-1055,793],[-1008,788],[-997,779],[-1052,784],[-1042,787]],[[-924,813],[-858,793],[-908,782],[-929,783],[-940,788],[-931,794],[-967,802],[-943,810],[-947,812],[-924,813]],[[-686,-556],[-747,-528],[-711,-541],[-693,-525],[-678,-538],[-650,-547],[-686,-556]],[[-129,78],[-148,109],[-166,122],[-176,147],[-165,161],[-161,181],[-170,219],[-144,263],[-96,299],[-93,326],[-69,341],[-59,358],[-22,352],[15,366],[95,373],[111,369],[103,338],[191,303],[201,310],[201,322],[215,328],[289,309],[310,316],[338,310],[360,346],[362,367],[325,361],[276,367],[263,382],[268,390],[262,395],[273,404],[288,405],[292,412],[311,411],[335,420],[383,409],[416,415],[415,426],[367,452],[391,473],[350,463],[363,451],[339,444],[325,453],[333,461],[307,466],[288,449],[277,426],[288,411],[264,402],[249,409],[237,407],[244,401],[239,400],[226,403],[240,377],[231,379],[232,364],[225,364],[194,403],[195,417],[131,457],[123,454],[126,441],[185,402],[169,404],[164,398],[171,389],[161,380],[154,400],[89,444],[65,431],[31,431],[30,419],[8,410],[-3,393],[1,387],[-21,367],[-44,367],[-54,359],[-65,369],[-89,369],[-88,383],[-95,387],[-88,408],[-94,430],[-80,437],[-19,434],[-14,440],[-12,460],[-45,480],[-46,487],[-16,486],[-19,498],[-10,493],[13,501],[16,509],[38,516],[47,531],[81,535],[88,540],[81,555],[85,571],[106,577],[103,569],[109,565],[96,555],[109,540],[125,545],[141,538],[176,549],[197,544],[213,552],[216,574],[225,578],[241,570],[244,584],[233,592],[291,600],[281,605],[229,598],[213,607],[215,632],[254,651],[239,660],[222,657],[212,650],[214,644],[178,627],[171,613],[188,601],[168,587],[159,561],[129,554],[104,595],[84,583],[57,586],[50,620],[105,645],[148,678],[192,698],[282,712],[313,705],[300,702],[311,696],[365,691],[411,675],[411,668],[384,660],[332,666],[348,659],[349,644],[370,638],[365,648],[372,651],[396,645],[404,648],[398,655],[421,665],[439,661],[445,668],[435,686],[463,682],[468,677],[456,676],[456,670],[463,667],[537,689],[545,688],[535,682],[588,689],[599,683],[611,689],[600,695],[606,699],[685,681],[692,686],[669,695],[667,710],[699,730],[726,728],[728,722],[718,714],[728,704],[726,690],[737,684],[713,663],[724,662],[751,678],[745,683],[749,690],[736,696],[744,706],[731,714],[749,721],[747,728],[757,723],[753,713],[764,712],[759,719],[776,723],[815,718],[805,736],[868,739],[860,745],[872,751],[1008,764],[1044,777],[1072,765],[1111,767],[1141,758],[1094,742],[1130,740],[1135,733],[1156,738],[1232,730],[1233,737],[1270,736],[1286,730],[1291,724],[1285,720],[1313,708],[1323,718],[1399,715],[1391,724],[1405,728],[1495,722],[1530,708],[1590,709],[1598,705],[1597,697],[1609,694],[1678,696],[1696,687],[1708,690],[1700,697],[1705,701],[1800,690],[1800,650],[1774,646],[1794,630],[1792,623],[1737,617],[1703,599],[1689,606],[1635,599],[1620,582],[1632,576],[1631,562],[1621,561],[1617,553],[1621,549],[1604,543],[1600,532],[1585,530],[1582,519],[1568,510],[1554,554],[1559,568],[1568,578],[1584,581],[1637,611],[1645,626],[1601,605],[1593,618],[1567,614],[1542,598],[1550,591],[1513,588],[1513,595],[1498,597],[1422,590],[1351,547],[1382,538],[1399,542],[1413,531],[1414,522],[1401,484],[1382,463],[1349,434],[1335,428],[1323,433],[1275,398],[1295,368],[1291,351],[1265,344],[1261,367],[1269,369],[1247,381],[1253,396],[1243,399],[1211,389],[1222,404],[1216,409],[1180,392],[1175,387],[1189,374],[1224,375],[1225,369],[1211,367],[1192,349],[1202,344],[1219,317],[1213,307],[1221,298],[1217,282],[1187,245],[1159,228],[1108,214],[1104,203],[1099,203],[1099,214],[1085,217],[1059,198],[1057,191],[1089,153],[1093,134],[1092,117],[1052,86],[1051,99],[1035,106],[1026,122],[1008,126],[1010,134],[1001,134],[992,92],[1030,55],[1042,13],[1014,28],[1001,65],[985,84],[983,78],[988,114],[972,169],[954,157],[942,160],[943,182],[914,228],[905,228],[903,218],[870,215],[865,202],[822,166],[803,159],[799,104],[775,80],[735,160],[726,214],[705,209],[692,221],[693,228],[664,254],[615,251],[574,257],[565,271],[547,265],[515,279],[501,301],[480,300],[508,248],[510,260],[516,258],[518,240],[540,241],[564,264],[568,242],[587,236],[598,223],[578,202],[577,189],[553,172],[524,164],[522,156],[487,140],[435,126],[426,168],[391,213],[385,237],[346,281],[350,294],[349,295],[348,298],[339,276],[324,299],[357,239],[355,231],[369,220],[375,186],[393,159],[433,124],[427,117],[446,104],[511,120],[510,106],[477,42],[403,-26],[392,-47],[387,-59],[394,-68],[392,-85],[405,-108],[408,-147],[401,-161],[348,-198],[355,-241],[326,-257],[325,-283],[301,-311],[258,-339],[226,-339],[196,-348],[184,-341],[182,-317],[152,-271],[143,-221],[118,-181],[116,-167],[136,-120],[132,-86],[119,-50],[88,-11],[98,31],[85,48],[59,43],[43,63],[27,63],[-20,47],[-46,52],[-80,44],[-129,78]],[[-688,190],[-687,182],[-707,184],[-714,176],[-745,183],[-723,187],[-732,199],[-708,199],[-688,190]],[[-535,492],[-538,485],[-531,487],[-526,475],[-531,467],[-542,468],[-542,478],[-554,469],[-560,469],[-553,474],[-563,476],[-594,479],[-559,516],[-554,516],[-568,498],[-535,492]],[[-67,552],[-57,546],[-68,523],[-100,518],[-92,529],[-97,539],[-67,552]],[[-50,558],[-56,553],[-58,578],[-50,586],[-30,586],[-41,576],[-20,577],[-31,560],[-21,559],[5,529],[17,527],[11,518],[14,513],[-58,502],[-34,514],[-53,520],[-42,523],[-46,535],[-31,534],[-29,540],[-48,548],[-50,558]],[[-218,644],[-240,649],[-222,654],[-243,656],[-221,664],[-206,657],[-145,665],[-147,658],[-136,651],[-187,635],[-228,640],[-218,644]],[[-679,701],[-670,692],[-688,687],[-619,669],[-639,650],[-667,664],[-680,663],[-681,657],[-653,644],[-647,634],[-650,627],[-688,637],[-662,619],[-710,629],[-748,647],[-786,646],[-779,653],[-740,655],[-739,663],[-727,673],[-733,681],[-769,689],[-762,691],[-790,702],[-813,697],[-887,704],[-895,708],[-885,712],[-899,712],[-902,722],[-884,735],[-858,738],[-866,732],[-858,725],[-849,733],[-823,738],[-806,727],[-807,721],[-778,727],[-679,701]],[[-208,827],[-319,822],[-221,817],[-232,812],[-158,819],[-122,813],[-200,802],[-177,801],[-197,788],[-197,776],[-185,770],[-217,766],[-198,761],[-196,752],[-207,752],[-194,743],[-216,742],[-204,738],[-208,735],[-236,733],[-223,722],[-248,723],[-221,715],[-218,707],[-235,705],[-255,714],[-252,708],[-264,702],[-223,701],[-277,685],[-318,681],[-342,667],[-398,655],[-412,635],[-428,627],[-424,619],[-434,601],[-483,609],[-516,636],[-540,672],[-530,684],[-515,687],[-509,699],[-547,696],[-544,708],[-514,706],[-558,717],[-547,726],[-586,755],[-685,761],[-714,770],[-668,774],[-733,780],[-657,794],[-653,798],[-680,801],[-603,820],[-504,824],[-445,817],[-468,826],[-351,836],[-208,827]],[[-811,830],[-728,832],[-618,826],[-677,815],[-655,815],[-712,798],[-769,793],[-755,792],[-762,790],[-754,785],[-798,772],[-779,768],[-806,762],[-895,765],[-896,770],[-878,772],[-883,779],[-850,775],[-880,784],[-851,793],[-869,803],[-818,805],[-876,805],[-916,819],[-832,823],[-811,830]],[[171,768],[138,774],[147,777],[104,797],[170,801],[215,790],[190,786],[171,768]],[[497,-157],[471,-249],[454,-256],[440,-250],[433,-221],[444,-201],[440,-174],[444,-162],[477,-146],[492,-120],[505,-152],[502,-160],[497,-157]],[[1146,-88],[1083,-78],[1054,-69],[1061,-59],[1086,-68],[1108,-65],[1157,-84],[1146,-88]],[[1058,-59],[1014,-28],[986,18],[953,55],[975,52],[1006,21],[1017,21],[1038,1],[1034,-7],[1061,-31],[1058,-59]],[[1166,-15],[1161,-40],[1149,-41],[1133,-31],[1121,-35],[1102,-29],[1090,4],[1097,20],[1112,19],[1114,27],[1130,31],[1171,69],[1192,54],[1173,32],[1190,9],[1178,8],[1175,-8],[1166,-15]],[[818,75],[816,65],[803,60],[797,82],[801,98],[818,75]],[[689,765],[585,743],[554,724],[556,715],[575,707],[516,715],[524,728],[544,736],[535,737],[559,746],[556,751],[612,763],[689,765]],[[933,794],[912,803],[959,813],[1002,798],[999,789],[978,788],[933,794]],[[1740,-409],[1742,-418],[1727,-434],[1731,-439],[1715,-442],[1706,-459],[1693,-466],[1667,-462],[1670,-451],[1705,-430],[1721,-410],[1728,-405],[1732,-413],[1740,-409]],[[1738,-395],[1747,-374],[1730,-345],[1743,-353],[1753,-372],[1754,-365],[1768,-379],[1785,-377],[1780,-392],[1772,-391],[1752,-417],[1747,-413],[1749,-399],[1738,-395]],[[1206,-339],[1180,-351],[1150,-342],[1158,-322],[1133,-261],[1138,-265],[1134,-256],[1142,-263],[1134,-244],[1137,-225],[1167,-207],[1209,-197],[1230,-164],[1239,-171],[1235,-166],[1257,-142],[1271,-138],[1296,-150],[1306,-125],[1326,-121],[1318,-113],[1324,-111],[1353,-122],[1365,-119],[1370,-124],[1355,-150],[1402,-177],[1413,-164],[1425,-107],[1439,-145],[1446,-142],[1454,-150],[1464,-190],[1488,-204],[1497,-223],[1507,-224],[1509,-235],[1529,-253],[1536,-281],[1529,-316],[1503,-357],[1500,-374],[1463,-390],[1449,-384],[1450,-379],[1436,-388],[1406,-380],[1396,-361],[1381,-356],[1382,-344],[1368,-353],[1378,-329],[1360,-349],[1343,-326],[1313,-315],[1261,-322],[1242,-330],[1237,-339],[1206,-339]],[[1470,-67],[1507,-106],[1479,-101],[1460,-81],[1447,-76],[1426,-93],[1391,-81],[1376,-84],[1387,-73],[1379,-54],[1337,-35],[1330,-41],[1320,-28],[1337,-22],[1322,-22],[1305,-9],[1324,-4],[1340,-8],[1344,-28],[1355,-34],[1374,-17],[1410,-26],[1446,-39],[1460,-55],[1476,-61],[1479,-66],[1470,-67]],[[1483,-57],[1501,-50],[1508,-55],[1515,-42],[1523,-43],[1520,-55],[1502,-63],[1483,-57]],[[1202,2],[1209,-14],[1233,-6],[1215,-19],[1232,-53],[1222,-53],[1227,-45],[1215,-46],[1210,-26],[1203,-29],[1204,-55],[1198,-57],[1195,-35],[1188,-28],[1200,6],[1209,13],[1229,9],[1252,14],[1237,2],[1202,2]],[[1277,-3],[1274,10],[1279,22],[1286,3],[1280,-3],[1284,-8],[1277,-3]],[[1242,62],[1236,78],[1219,72],[1235,87],[1238,82],[1255,90],[1254,98],[1262,93],[1265,72],[1262,63],[1258,73],[1254,68],[1254,56],[1242,62]],[[1243,115],[1249,114],[1243,126],[1252,125],[1258,110],[1250,113],[1248,101],[1243,115]],[[1217,143],[1240,138],[1241,125],[1229,136],[1206,139],[1210,145],[1201,150],[1199,164],[1203,160],[1207,185],[1222,185],[1225,171],[1215,151],[1217,143]],[[1358,335],[1351,346],[1310,339],[1320,331],[1307,310],[1294,333],[1326,354],[1357,355],[1367,373],[1374,368],[1394,382],[1399,406],[1414,414],[1419,392],[1410,382],[1403,351],[1372,346],[1358,335]],[[1398,426],[1414,434],[1420,456],[1439,442],[1453,444],[1455,433],[1441,430],[1432,420],[1416,427],[1411,416],[1400,416],[1398,426]],[[1435,461],[1427,467],[1421,460],[1419,468],[1417,533],[1427,544],[1447,490],[1432,493],[1426,479],[1435,461]],[[1375,759],[1451,756],[1443,748],[1390,746],[1370,753],[1375,759]]];
const NORWAY_RINGS = [[[286,691],[290,698],[277,702],[262,698],[257,691],[247,686],[237,689],[224,688],[212,694],[200,691],[199,684],[180,686],[177,680],[168,680],[136,648],[139,644],[136,640],[126,641],[119,631],[120,618],[126,613],[123,601],[110,589],[104,595],[84,583],[70,581],[57,586],[53,597],[50,620],[59,626],[86,635],[105,645],[148,678],[192,698],[214,703],[230,702],[245,710],[264,710],[282,712],[313,705],[300,702],[311,696],[286,691]],[[207,777],[214,779],[208,783],[229,785],[233,781],[247,779],[225,774],[207,777]],[[170,801],[215,790],[190,786],[185,778],[176,776],[171,768],[159,768],[138,774],[147,777],[132,780],[112,789],[104,797],[132,800],[137,797],[151,797],[155,800],[170,801]],[[230,794],[201,796],[199,798],[185,799],[174,803],[205,806],[219,804],[229,807],[274,801],[259,795],[230,794]]];

const NORWAY_HQ = {
  lat: 59.9139,
  lon: 10.7522,
  label: "NORWAY · 59.9°N",
};

const latLonToVec3 = (lat, lon, radius, THREE) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

const computeHaversineKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const initInteractiveGlobe = () => {
  const stage = document.getElementById("globe-stage");
  if (!stage || typeof window.THREE === "undefined") return;

  const THREE = window.THREE;
  const width = stage.clientWidth || 300;
  const height = stage.clientHeight || 290;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
  camera.position.set(0, 0, 290);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    return;
  }

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  stage.querySelectorAll("canvas").forEach((c) => c.remove());
  stage.appendChild(renderer.domElement);

  const globeGroup = new THREE.Group();
  globeGroup.rotation.order = "YXZ";
  scene.add(globeGroup);

  const RADIUS = 98;

  // 1. Deep Obsidian Ocean Core Sphere
  const coreGeo = new THREE.SphereGeometry(RADIUS * 0.992, 56, 56);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x050811,
    transparent: true,
    opacity: 0.96,
  });
  globeGroup.add(new THREE.Mesh(coreGeo, coreMat));

  // 2. Outer Atmospheric Fresnel Rim Halo
  const haloGeo = new THREE.SphereGeometry(RADIUS * 1.055, 48, 48);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.065,
    side: THREE.BackSide,
  });
  scene.add(new THREE.Mesh(haloGeo, haloMat));

  // 3. Tactical Graticule Grid (Lat/Lon lines)
  const graticulePoints = [];
  for (let lat = -60; lat <= 75; lat += 30) {
    for (let lon = -180; lon < 180; lon += 5) {
      const p1 = latLonToVec3(lat, lon, RADIUS * 0.996, THREE);
      const p2 = latLonToVec3(lat, lon + 5, RADIUS * 0.996, THREE);
      graticulePoints.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    }
  }
  for (let lon = -180; lon < 180; lon += 30) {
    for (let lat = -75; lat < 75; lat += 5) {
      const p1 = latLonToVec3(lat, lon, RADIUS * 0.996, THREE);
      const p2 = latLonToVec3(lat + 5, lon, RADIUS * 0.996, THREE);
      graticulePoints.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    }
  }
  const gratGeo = new THREE.BufferGeometry();
  gratGeo.setAttribute("position", new THREE.Float32BufferAttribute(graticulePoints, 3));
  const gratMat = new THREE.LineBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.12,
  });
  globeGroup.add(new THREE.LineSegments(gratGeo, gratMat));

  // 4. Decode 10,000-Point Fibonacci Sphere Land Dot-Matrix
  const rawBytes = Uint8Array.from(atob(LAND_MASK_B64), (c) => c.charCodeAt(0));
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const landPositions = [];

  for (let i = 0; i < FIB_COUNT; i++) {
    if ((rawBytes[i >> 3] & (1 << (i & 7))) !== 0) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / FIB_COUNT);
      const lat = 90 - (phi * 180) / Math.PI;
      const lon = (((theta * 180) / Math.PI) % 360) - 180;
      const v = latLonToVec3(lat, lon, RADIUS * 1.001, THREE);
      landPositions.push(v.x, v.y, v.z);
    }
  }

  const dotsGeo = new THREE.BufferGeometry();
  dotsGeo.setAttribute("position", new THREE.Float32BufferAttribute(landPositions, 3));
  const dotsMat = new THREE.PointsMaterial({
    color: 0x94a3b8,
    size: 1.55,
    transparent: true,
    opacity: 0.72,
  });
  globeGroup.add(new THREE.Points(dotsGeo, dotsMat));

  // 5. World Continent Coastlines in 3D
  const coastSegments = [];
  COAST_RINGS.forEach((ring) => {
    for (let i = 0; i < ring.length - 1; i++) {
      const p1 = latLonToVec3(ring[i][1] / 10, ring[i][0] / 10, RADIUS * 1.003, THREE);
      const p2 = latLonToVec3(ring[i + 1][1] / 10, ring[i + 1][0] / 10, RADIUS * 1.003, THREE);
      coastSegments.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    }
  });
  const coastGeo = new THREE.BufferGeometry();
  coastGeo.setAttribute("position", new THREE.Float32BufferAttribute(coastSegments, 3));
  const coastMat = new THREE.LineBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.36,
  });
  globeGroup.add(new THREE.LineSegments(coastGeo, coastMat));

  // 6. Highlighted Norway Border in Glowing Emerald
  const norwaySegments = [];
  NORWAY_RINGS.forEach((ring) => {
    for (let i = 0; i < ring.length - 1; i++) {
      const p1 = latLonToVec3(ring[i][1] / 10, ring[i][0] / 10, RADIUS * 1.008, THREE);
      const p2 = latLonToVec3(ring[i + 1][1] / 10, ring[i + 1][0] / 10, RADIUS * 1.008, THREE);
      norwaySegments.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    }
  });
  const norwayGeo = new THREE.BufferGeometry();
  norwayGeo.setAttribute("position", new THREE.Float32BufferAttribute(norwaySegments, 3));
  const norwayMat = new THREE.LineBasicMaterial({
    color: 0x10b981,
    transparent: true,
    opacity: 0.98,
  });
  globeGroup.add(new THREE.LineSegments(norwayGeo, norwayMat));

  // 7. Norway HQ Beacon (Oslo: 59.91°N, 10.75°E)
  const hqPos = latLonToVec3(NORWAY_HQ.lat, NORWAY_HQ.lon, RADIUS * 1.012, THREE);
  const hqDotGeo = new THREE.SphereGeometry(2.6, 16, 16);
  const hqDotMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const hqMesh = new THREE.Mesh(hqDotGeo, hqDotMat);
  hqMesh.position.copy(hqPos);
  globeGroup.add(hqMesh);

  const ringGeo = new THREE.RingGeometry(2.8, 4.6, 32);
  const hqRingMat = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85,
  });
  const hqRing = new THREE.Mesh(ringGeo, hqRingMat);
  hqRing.position.copy(hqPos.clone().multiplyScalar(1.004));
  hqRing.lookAt(hqPos.clone().multiplyScalar(2));
  globeGroup.add(hqRing);

  // Dynamic Visitor Beacon & 3D Geodesic Arc Group
  const dynamicArcGroup = new THREE.Group();
  globeGroup.add(dynamicArcGroup);

  let arcCurvePoints = [];
  let pingPacketMesh = null;
  let visitorRingMesh = null;
  let visitorLocalVec = latLonToVec3(40.71, -74.0, RADIUS * 1.012, THREE);
  let packetProgress = 0;
  let packetSpeed = 0.012;

  // Compute exact YXZ rotation to face any (lat, lon) toward the +Z camera
  const getCameraTargetRotation = (lat, lon) => {
    const v = latLonToVec3(lat, lon, 1, THREE);
    const ry = -Math.atan2(v.x, v.z);
    const rx = Math.max(-0.85, Math.min(0.85, (lat * Math.PI) / 180 * 0.72));
    return { rx, ry };
  };

  const initialRot = getCameraTargetRotation(NORWAY_HQ.lat, NORWAY_HQ.lon);
  let targetRotY = initialRot.ry;
  let targetRotX = initialRot.rx;
  let rotY = targetRotY;
  let rotX = targetRotX;
  let velX = 0;
  let velY = 0;
  let isDragging = false;
  let prevX = 0;
  let prevY = 0;
  let lastInteractionTime = 0;

  const buildGeodesicArc = (vLat, vLon) => {
    while (dynamicArcGroup.children.length > 0) {
      dynamicArcGroup.remove(dynamicArcGroup.children[0]);
    }

    const startVec = latLonToVec3(vLat, vLon, RADIUS * 1.012, THREE);
    visitorLocalVec = startVec.clone();
    const endVec = hqPos.clone();

    // Visitor beacon sphere
    const vDotGeo = new THREE.SphereGeometry(2.5, 16, 16);
    const vDotMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const vDot = new THREE.Mesh(vDotGeo, vDotMat);
    vDot.position.copy(startVec);
    dynamicArcGroup.add(vDot);

    // Visitor pulse ring
    const vRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    visitorRingMesh = new THREE.Mesh(ringGeo.clone(), vRingMat);
    visitorRingMesh.position.copy(startVec.clone().multiplyScalar(1.004));
    visitorRingMesh.lookAt(startVec.clone().multiplyScalar(2));
    dynamicArcGroup.add(visitorRingMesh);

    // Great-circle geodesic arc with parabolic altitude
    const dist = startVec.distanceTo(endVec);
    const arcHeight = Math.min(0.4, Math.max(0.1, dist / (RADIUS * 2.5)));
    const segments = 76;
    arcCurvePoints = [];
    const arcCoords = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const interp = new THREE.Vector3().lerpVectors(startVec, endVec, t).normalize();
      const elevation = 1 + Math.sin(Math.PI * t) * arcHeight;
      const pt = interp.multiplyScalar(RADIUS * elevation);
      arcCurvePoints.push(pt);
      arcCoords.push(pt.x, pt.y, pt.z);
    }

    const arcGeo = new THREE.BufferGeometry();
    arcGeo.setAttribute("position", new THREE.Float32BufferAttribute(arcCoords, 3));
    const arcMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.88,
    });
    dynamicArcGroup.add(new THREE.Line(arcGeo, arcMat));

    // Traveling Telemetry Packet Sphere
    const pktGeo = new THREE.SphereGeometry(2.3, 12, 12);
    const pktMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    pingPacketMesh = new THREE.Mesh(pktGeo, pktMat);
    dynamicArcGroup.add(pingPacketMesh);

    // Frame camera on the midpoint of the 3D geodesic arc
    const midVec = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5).normalize();
    targetRotY = -Math.atan2(midVec.x, midVec.z);
    const midLat = Math.asin(midVec.y) * (180 / Math.PI);
    targetRotX = Math.max(-0.78, Math.min(0.82, (midLat * Math.PI) / 180 * 0.68));
  };

  // Finger Touch & Mouse Spin Physics
  const onPointerDown = (clientX, clientY) => {
    isDragging = true;
    prevX = clientX;
    prevY = clientY;
    velX = 0;
    velY = 0;
    lastInteractionTime = performance.now();
  };

  const onPointerMove = (clientX, clientY) => {
    if (!isDragging) return;
    const dx = clientX - prevX;
    const dy = clientY - prevY;
    prevX = clientX;
    prevY = clientY;

    velY = dx * 0.0068;
    velX = dy * 0.0068;

    rotY += velY;
    rotX = Math.max(-1.15, Math.min(1.15, rotX + velX));
    targetRotY = rotY;
    targetRotX = rotX;
    lastInteractionTime = performance.now();
  };

  const onPointerUp = () => {
    isDragging = false;
  };

  const domElem = renderer.domElement;
  domElem.style.touchAction = "none";
  domElem.style.cursor = "grab";

  domElem.addEventListener("mousedown", (e) => {
    domElem.style.cursor = "grabbing";
    onPointerDown(e.clientX, e.clientY);
  });
  window.addEventListener("mousemove", (e) => onPointerMove(e.clientX, e.clientY), { passive: true }});
  window.addEventListener("mouseup", () => {
    domElem.style.cursor = "grab";
    onPointerUp();
  });

  domElem.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true }
  );
  domElem.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length === 1) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true }
  );
  domElem.addEventListener("touchend", onPointerUp, { passive: true });

  // DOM Elements for Telemetry & 3D Floating Pin Labels
  const originEl = document.getElementById("globe-visitor-loc");
  const distEl = document.getElementById("globe-distance");
  const rttEl = document.getElementById("globe-rtt");
  const badgeRttEl = document.getElementById("hud-ping-badge");
  const labelNorway = document.getElementById("pin-label-norway");
  const labelVisitor = document.getElementById("pin-label-visitor");

  let visitorCoords = { lat: 40.7128, lon: -74.006, label: "Locating IP..." };

  const measureLivePing = async () => {
    const t0 = performance.now();
    try {
      await fetch(window.location.href.split("#")[0] + "?ping=" + Date.now(), {
        method: "HEAD",
        cache: "no-store",
      });
    } catch {
      // Fallback in sandboxed preview
    }
    const rtt = Math.max(4, Math.round(performance.now() - t0));
    if (rttEl) rttEl.textContent = `${rtt} ms`;
    if (badgeRttEl) badgeRttEl.textContent = `PING: ${rtt} ms`;
    packetProgress = 0;
    packetSpeed = 0.025;
    setTimeout(() => {
      packetSpeed = 0.011;
    }, 1100);
  };

  const detectVisitorIP = async () => {
    const endpoints = [
      {
        url: "https://ipwho.is/",
        parse: (d) =>
          d && d.success !== false && d.latitude
            ? { lat: Number(d.latitude), lon: Number(d.longitude), city: d.city, country: d.country_code || d.country }
            : null,
      },
      {
        url: "https://ipapi.co/json/",
        parse: (d) =>
          d && d.latitude
            ? { lat: Number(d.latitude), lon: Number(d.longitude), city: d.city, country: d.country_code || d.country_name }
            : null,
      },
      {
        url: "https://get.geojs.io/v1/ip/geo.json",
        parse: (d) =>
          d && d.latitude
            ? { lat: Number(d.latitude), lon: Number(d.longitude), city: d.city, country: d.country_code || d.country }
            : null,
      },
    ];

    for (const ep of endpoints) {
      try {
        const t0 = performance.now();
        const res = await fetch(ep.url, { cache: "no-store" });
        if (!res.ok) continue;
        const data = await res.json();
        const rtt = Math.max(6, Math.round(performance.now() - t0));
        const parsed = ep.parse(data);
        if (parsed && !Number.isNaN(parsed.lat) && !Number.isNaN(parsed.lon)) {
          const locName = [parsed.city, parsed.country].filter(Boolean).join(", ") || "Visitor IP";
          visitorCoords = { lat: parsed.lat, lon: parsed.lon, label: locName };
          if (originEl) originEl.textContent = locName;
          if (labelVisitor) labelVisitor.textContent = `YOU · ${parsed.city || parsed.country || "IP"}`;
          const km = computeHaversineKm(parsed.lat, parsed.lon, NORWAY_HQ.lat, NORWAY_HQ.lon);
          if (distEl) distEl.textContent = `${km.toLocaleString()} km`;
          if (rttEl) rttEl.textContent = `${rtt} ms`;
          if (badgeRttEl) badgeRttEl.textContent = `PING: ${rtt} ms`;
          buildGeodesicArc(parsed.lat, parsed.lon);
          return;
        }
      } catch {
        // Try next geo-IP endpoint
      }
    }

    // Fallback if browser privacy shield blocks external Geo-IP APIs
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Oslo";
    const cityGuess = tz.split("/").pop().replace(/_/g, " ") || "Client Node";
    let fb = { lat: 51.5074, lon: -0.1278, label: cityGuess };
    if (tz.includes("America")) fb = { lat: 37.77, lon: -122.41, label: `${cityGuess}, US` };
    else if (tz.includes("Oslo")) fb = { lat: 60.39, lon: 5.32, label: "Bergen / Oslo, NO" };
    else if (tz.includes("Europe")) fb = { lat: 50.11, lon: 8.68, label: `${cityGuess}, EU` };
    else if (tz.includes("Asia")) fb = { lat: 35.67, lon: 139.65, label: `${cityGuess}, APAC` };

    visitorCoords = fb;
    if (originEl) originEl.textContent = fb.label;
    if (labelVisitor) labelVisitor.textContent = `YOU · ${cityGuess}`;
    const km = computeHaversineKm(fb.lat, fb.lon, NORWAY_HQ.lat, NORWAY_HQ.lon);
    if (distEl) distEl.textContent = `${km.toLocaleString()} km`;
    buildGeodesicArc(fb.lat, fb.lon);
    measureLivePing();
  };

  window.triggerGlobePing = () => {
    lastInteractionTime = 0;
    velX = 0;
    velY = 0;
    const startVec = latLonToVec3(visitorCoords.lat, visitorCoords.lon, RADIUS, THREE);
    const midVec = new THREE.Vector3().addVectors(startVec, hqPos).multiplyScalar(0.5).normalize();
    targetRotY = -Math.atan2(midVec.x, midVec.z);
    const midLat = Math.asin(midVec.y) * (180 / Math.PI);
    targetRotX = Math.max(-0.78, Math.min(0.82, (midLat * Math.PI) / 180 * 0.68));
    measureLivePing();
  };

  const pingBtn = document.getElementById("globe-ping-btn");
  if (pingBtn) {
    pingBtn.addEventListener("click", () => window.triggerGlobePing());
  }

  buildGeodesicArc(visitorCoords.lat, visitorCoords.lon);
  detectVisitorIP();
  setInterval(measureLivePing, 8000);

  // Helper to project 3D local sphere point to 2D overlay coordinates
  const updatePinLabel = (el, localVec) => {
    if (!el) return;
    const worldVec = localVec.clone().applyEuler(globeGroup.rotation);
    // Visible only if on front hemisphere facing camera (z > 15)
    if (worldVec.z < 18) {
      el.style.opacity = "0";
      return;
    }
    const ndc = worldVec.clone().project(camera);
    const w = stage.clientWidth || 300;
    const h = stage.clientHeight || 290;
    const x = (ndc.x * 0.5 + 0.5) * w;
    const y = (-(ndc.y * 0.5) + 0.5) * h;
    el.style.opacity = "1";
    el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) translate(-50%, -135%)`;
  };

  let pulseClock = 0;
  const animate = (now) => {
    requestAnimationFrame(animate);
    pulseClock += 0.035;

    if (!isDragging) {
      if (Math.abs(velX) > 0.0001 || Math.abs(velY) > 0.0001) {
        rotY += velY;
        rotX = Math.max(-1.15, Math.min(1.15, rotX + velX));
        velX *= 0.93;
        velY *= 0.93;
        targetRotY = rotY;
        targetRotX = rotX;
      } else if (now - lastInteractionTime > 4500) {
        targetRotY += 0.0007;
        rotY += (targetRotY - rotY) * 0.04;
        rotX += (targetRotX - rotX) * 0.04;
      } else {
        rotY += (targetRotY - rotY) * 0.06;
        rotX += (targetRotX - rotX) * 0.06;
      }
    }

    globeGroup.rotation.y = rotY;
    globeGroup.rotation.x = rotX;

    const ringScale = 1 + (pulseClock % 1.8);
    const ringAlpha = Math.max(0, 0.85 - (pulseClock % 1.8) * 0.45);
    hqRing.scale.set(ringScale, ringScale, 1);
    hqRingMat.opacity = ringAlpha;

    if (visitorRingMesh) {
      visitorRingMesh.scale.set(ringScale, ringScale, 1);
      visitorRingMesh.material.opacity = ringAlpha;
    }

    if (pingPacketMesh && arcCurvePoints.length > 0) {
      packetProgress = (packetProgress + packetSpeed) % 1;
      const idx = Math.min(
        arcCurvePoints.length - 1,
        Math.floor(packetProgress * arcCurvePoints.length)
      );
      pingPacketMesh.position.copy(arcCurvePoints[idx]);
    }

    updatePinLabel(labelNorway, hqPos);
    updatePinLabel(labelVisitor, visitorLocalVec);

    renderer.render(scene, camera);
  };

  requestAnimationFrame(animate);

  window.addEventListener(
    "resize",
    () => {
      const w = stage.clientWidth || 300;
      const h = stage.clientHeight || 290;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    },
    { passive: true }
  );
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initInteractiveGlobe, { once: true });
} else {
  initInteractiveGlobe();
}
