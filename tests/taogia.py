# Bộ file Excel GIẢ cùng cấu trúc hệ thống (không dùng dữ liệu thật)
import openpyxl, random, sys, os
random.seed(7)
N = int(sys.argv[1]) if len(sys.argv)>1 else 25000
OUT = sys.argv[2] if len(sys.argv)>2 else 'gia'
os.makedirs(OUT, exist_ok=True)
XA = [('540034','Phường Gia Lộc',[('TXN0543404','Gia Lộc 2','07',['54003401','54003402']),('TXN0543405','Gia Lộc','23',['54003403','54003407'])]),
      ('540035','Phường Gò Dầu',[('TXN0543502','Phường Gò Dầu','05',['54003508','54003511']),('TXN0543501','Gia Bình','12',['54003505','54003501'])]),
      ('540083','Xã Truông Mít',[('TXN0548302','Truông Mít','25',['54008306','54008309'])])]
CT = [('01','HONGHEO','Cho vay ưu đãi hộ nghèo'),('02','HSSV','Cho vay học sinh, sinh viên có hoàn cảnh khó khăn'),('03','GQVL','Cho vay giải quyết việc làm'),('06','NSVSMT','Cho vay nước sạch và vệ sinh môi trường nông thôn'),('19','HCN_QD15','Cho vay hộ cận nghèo theo QĐ 15')]
HO = ['Nguyễn','Trần','Lê','Phạm','Võ','Huỳnh','Đặng','Bùi']; DEM=['Văn','Thị','Ngọc','Minh','Thanh']; TEN=['An','Bình','Cường','Dung','Giả','Hạnh','Khoa','Lan','Mai','Nam','Oanh','Phúc','Quý','Sang','Tâm','Uyên','Vy','Xuân','Yến','Thử']
thon_info = {}
for xa,tx,ds in XA:
    for md,td,ng,th in ds:
        for t in th: thon_info[t]=(xa,tx,md,td,ng)
to_list=[]
for i,t in enumerate(thon_info):
    for j in range(6): to_list.append(('%07d'%(26000+i*10+j), t, random.choice(['11','12','13','14'])))
def ten(): return random.choice(HO)+' '+random.choice(DEM)+' '+random.choice(TEN)
khs=[]; ku_n=0; rows=[]
nkh = int(N*0.75)
for k in range(nkh):
    to,thon,dv = random.choice(to_list); makh='48%08d'%k
    kh=(makh,ten(),'%02d/%02d/%d'%(random.randint(1,28),random.randint(1,12),random.randint(1950,2000)),'0721%08d'%random.randint(0,10**8-1),'%02d/%02d/2021'%(random.randint(1,28),random.randint(1,12)),'CỤC CS QLHC',' Ấp giả - xã giả - Tây Ninh',to,thon,dv)
    khs.append(kh)
while len(rows)<N:
    kh=random.choice(khs); ct=random.choice(CT); ku_n+=1
    dn=random.choice([10,20,30,40,50,100])*1_000_000; tt=random.random()
    qh = dn if tt<0.003 else 0; kn = dn if 0.003<=tt<0.005 else 0; th=dn-qh-kn
    rows.append(dict(kh=kh,ku='66000007%08d'%ku_n,ct=ct,gn=dn+random.choice([0,5,10])*1_000_000,dn=dn,th=th,qh=qh,kn=kn,nv='%02d/%02d/2023'%(random.randint(1,28),random.randint(1,12)),ndt=random.choice(['','','INV2706190050215']),nguon=random.choice(['1','1','1','2']), t105=random.randint(0,9)*1_000_000))
def sheet(ws, tieu, cot, data, them_nhieu=True):
    ws.cell(2,2,tieu)
    for j,c in enumerate(cot): ws.cell(5,j+2,c)
    r=6
    for i,d in enumerate(data):
        if them_nhieu and i==3: r+=1  # dòng trống
        if them_nhieu and i==len(data)//2:
            for j,c in enumerate(cot): ws.cell(r,j+2,c)   # tiêu đề lặp (ngắt trang)
            r+=1
        for j,v in enumerate(d): ws.cell(r,j+2,v)
        r+=1
    if them_nhieu:
        ws.cell(r,2,'Tổng cộng'); r+=2; ws.cell(r,2,'Người lập biểu'); ws.cell(r,6,'Kiểm soát')
def luu(wb,ten): wb.save(os.path.join(OUT,ten))
# 1 HSTD
C1=['Mã PGD','Mã xã','Tên xã','Mã thôn','Tên thôn','ĐVUT','Mã tổ','Tên tổ trưởng','Mã khách hàng','Tên khách hàng','Ngày sinh','CCCD','Ngày cấp','Nơi cấp','Địa chỉ','Mã món vay','Chương trình','Tên chương trình','Số tiền giải ngân','Tổng dư nợ','Dư nợ trong hạn','Dư nợ quá hạn','Dư nợ khoanh','Ngày vay','Ngày giải ngân đầu tiên','Số tiền gia hạn','Số tháng gia hạn','Tổng sô tháng gia hạn','Nguồn vốn','Lưu vị trong năm','Lãi tồn trong hạn','Lãi tồn quá hạn','Lãi tồn AH','Lãi tồn','Ngày nhập học','Ngày ra trường','HSSV','Số TK','Tên TK','105 đầu tháng','105 Ngày BC','Mã NĐT']
seen=set(); d1=[]
for x in rows:
    k=x['kh']; xa=thon_info[k[8]]; first = k[0] not in seen; seen.add(k[0])
    d1.append(['004820',xa[0],xa[1],k[8],'Thôn '+k[8][-2:],k[9],k[7],'TỔ TRƯỞNG '+k[7][-3:],k[0],k[1],k[2],k[3],k[4],k[5],k[6],x['ku'],x['ct'][0],x['ct'][2],x['gn'],x['dn'],x['th'],x['qh'],x['kn'],x['nv'],x['nv'],0,0,0,x['nguon'],'1',0,0,0,0,'01/09/2021' if x['ct'][0]=='02' else None,'01/06/2025' if x['ct'][0]=='02' else None,x['ct'][0],'48%08d'%int(k[0][2:]) if first else '', k[1].upper() if first else '', x['t105'] if first else 0, x['t105'] if first else 0, x['ndt']])
wb=openpyxl.Workbook(); ws=wb.active; ws.title='BCQUERY'; sheet(ws,'10. Sao kê chi tiết (DL Ngày)',C1,d1); luu(wb,'Ho so tin dung chi tiet 31-08-2026.xlsx')
# 6 TDN (gộp theo thôn × CT × nguồn × NĐT)
agg={}
for x in rows:
    k=x['kh']; key=(k[8],x['ct'][0],x['nguon'],x['ndt'])
    a=agg.setdefault(key,[set(),0,0,0,0]); a[0].add(k[0]); a[1]+=x['dn']; a[2]+=x['th']; a[3]+=x['qh']; a[4]+=x['kn']
C6=['Mã PGD','Nguồn vốn','Mã xã','Tên xã','Mã điểm giao dịch','Điểm giao dịch','Mã Thôn','Tên Thôn','Chương Trình','Chương trình VT','Tên Chương trình','Số KH','Tổng Dư nợ','DN Trong hạn','DN Quá hạn','DN Khoanh','Mã NĐT','Ngày báo cáo']
ctm={c[0]:c for c in CT}; d6=[]
for (t,c,ng,nd),a in sorted(agg.items()):
    xa=thon_info[t]; d6.append(['004820',ng,xa[0],xa[1],xa[2],xa[3],t,'Thôn '+t[-2:],c,ctm[c][1],ctm[c][2],len(a[0]),a[1],a[2],a[3],a[4],nd,'31/08/2026'])
wb=openpyxl.Workbook(); ws=wb.active; ws.title='BCQUERY'; sheet(ws,'1. TỔNG DƯ NỢ THEO CHƯƠNG TRÌNH',C6,d6,False); luu(wb,'Tong_du_no_2026-08-31.xlsx')
# 4 NQH (có Ngày báo cáo)
C4=['Mã PGD','Mã xã','Tên xã','Thôn','Mã điểm GD','Tên điểm GD','Mã tổ','Tên tổ trưởng','ĐVUT','Tên ĐVUT','Mã khách hàng','Tên khách hàng','Số khế ước','Dư nợ quá hạn','Chuyển QH trong tháng','Ngày chuyển quá hạn','Nguồn vốn','Chương trình','Chương trình VT','Tên Chương trình','Số dư 105','Ngày báo cáo']
d4=[]
for x in rows:
    if x['qh']>0:
        k=x['kh']; xa=thon_info[k[8]]; d4.append(['004820',xa[0],xa[1],k[8],xa[2],xa[3],k[7],'TỔ TRƯỞNG',k[9],'Hội',k[0],k[1],x['ku'],x['qh'],x['qh'] if random.random()<0.2 else 0,'23/08/2026','1',x['ct'][0],x['ct'][1],x['ct'][2],0,'31/08/2026'])
wb=openpyxl.Workbook(); ws=wb.active; ws.title='BCQUERY'; sheet(ws,'2. SAO KÊ DANH SÁCH NỢ QUÁ HẠN',C4,d4); luu(wb,'No qua han  31-08-2026.xlsx')
# 5 NK (không có ngày trong file) — tên file đảo từ, không dấu
C5=['Mã PGD','Ngày GDXA','Điểm GDXA','Tên điểm GDXA','Mã xã','Tên xã','Mã khách hàng','Tên khách hàng','Mã tổ','Tên tổ trưởng','Số khế ước','ĐVUT','Dư nợ khoanh','Ngày hiệu lực','Ngày hết hạn khoanh','Nguồn vốn','Chương trình','Tên chương trình','Nguyên nhân']
d5=[]
for x in rows:
    if x['kn']>0:
        k=x['kh']; xa=thon_info[k[8]]; d5.append(['004820',xa[4],xa[2],xa[3],xa[0],xa[1],k[0],k[1],k[7],'TT',x['ku'],k[9],x['kn'],'15/12/2022','15/12/2027','1',x['ct'][0],x['ct'][2],'Vắng mặt'])
wb=openpyxl.Workbook(); ws=wb.active; ws.title='BCQUERY'; sheet(ws,'13. Danh sách nợ khoanh (DL Tháng)',C5,d5); luu(wb,'Khoanh No_2026-08-31.xlsx')
# 3 KHĐ + sheet phụ của anh
C3=['Mã CN','Mã PGD','Mã thôn/ấp','Mã điểm GDX','Tên điểm GDX','ĐVUT','Mã tổ','Tên tổ trưởng','Mã khách hàng','Tên khách hàng','Số khế ước','Mã sản phẩm','Ngày đăng ký khoản vay','Ngày giải ngân đầu tiên','Ngày đến hạn gốc','Ngày đến hạn GH','Ngày đến hạn GDXA','Chương trình','Tổng dư nợ','Dư nợ trong hạn','Dư nợ quá hạn','Dư nợ khoanh','Ngày giao dịch gần nhất','Lãi đã thu','Lãi tồn']
d3=[]
for x in random.sample(rows, max(5,N//80)):
    k=x['kh']; xa=thon_info[k[8]]; d3.append(['005420','004820',k[8],xa[2],xa[3],k[9],k[7],'TT',k[0],k[1],x['ku'],'031MC1','03/04/2024','07/04/2024','07/04/2029','07/04/2029','07/04/2029',x['ct'][0],x['dn'],x['th'],x['qh'],x['kn'],'07/05/2026',1000000,200000])
wb=openpyxl.Workbook(); ws=wb.active; ws.title='BCQUERY'; sheet(ws,'14. Sao kê món vay N tháng không hoạt động (DL Tháng)',C3,d3)
w2=wb.create_sheet('Sheet4'); w2.append(['MACT','TENCT','TENVT']); w2.append(['01','Cho vay ưu đãi hộ nghèo','HONGHEO'])
w3=wb.create_sheet('BC Gia Lộc'); w3.append(['CHI NHÁNH']); w3.append(['DANH SÁCH MÓN VAY 3 THÁNG TRỞ LÊN KHÔNG HOẠT ĐỘNG']); w3.append(['ĐẾN NGÀY 31/08/2026'])
luu(wb,'Mon_vay_03_thang_KHD_2026-08-31.xlsx')
# 7 TT — mã tổ để dạng SỐ (mất số 0 đầu) để thử bù
C7=['Mã PGD','Mã xã','Tên xã','Mã điểm GDXA','Tên điểm GDXA','Ngày GDXA','Mã thôn','Tên thôn','ĐVUT','Mã tổ trưởng','Tên tổ trưởng','Năm sinh tổ trưởng','SĐT Tổ trưởng','Mã KH tổ phó','Tên Tổ phó','Trạng thái','Loại tổ']
d7=[]
for to,thon,dv in to_list:
    xa=thon_info[thon]; d7.append(['004820',xa[0],xa[1],xa[2],xa[3]+' ',xa[4],thon,'Thôn '+thon[-2:],dv,int(to),'TỔ TRƯỞNG '+to[-3:],'01/01/1970','09%08d'%int(to),'7000000001','TỔ PHÓ','A','01'])
wb=openpyxl.Workbook(); ws=wb.active; ws.title='BCQUERY'; sheet(ws,'12. THÔNG TIN TỔ TRƯỞNG',C7,d7); luu(wb,'Thong tin to truong T8 2026.xlsx')
print('món',len(rows),'KH',len(seen),'NQH',len(d4),'NK',len(d5),'KHĐ',len(d3),'TDN',len(d6),'tổ',len(d7))
print('TONG dn',sum(x['dn'] for x in rows),'qh',sum(x['qh'] for x in rows),'kn',sum(x['kn'] for x in rows))
