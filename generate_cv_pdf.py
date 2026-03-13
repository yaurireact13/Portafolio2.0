from fpdf import FPDF

pdf = FPDF()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()

# profile picture
pdf.image('img/perfil.png', x=150, y=10, w=40)  # adjust path relative to script

# header
pdf.set_font('Arial','B',20)
pdf.set_text_color(249,115,22)  # accent
pdf.cell(0,10,'Job Yauri',ln=True)

# contact info
pdf.set_font('Arial','',11)
pdf.set_text_color(0)
pdf.multi_cell(0,6,'Desarrollador Web Full Stack | Email: correo@example.com | Tel: +51 921876815')
pdf.ln(6)

# summary
pdf.set_font('Arial','B',14)
pdf.set_text_color(14,78,137)
pdf.cell(0,8,'Perfil profesional',ln=True)
pdf.set_font('Arial','',11)
pdf.set_text_color(0)
pdf.multi_cell(0,6,'Apasionado desarrollador full-stack con más de 3 años de experiencia construyendo aplicaciones web responsive y soluciones backend escalables. Experto en HTML, CSS, JavaScript, Node.js y bases de datos MySQL. Me entusiasma resolver problemas y crear experiencias digitales intuitivas.')
pdf.ln(2)

# strengths
pdf.set_font('Arial','B',14)
pdf.set_text_color(14,78,137)
pdf.cell(0,8,'Fortalezas',ln=True)
pdf.set_font('Arial','',11)
pdf.set_text_color(0)
strengths = ['Trabajo en equipo y comunicación', 'Pensamiento orientado a soluciones', 'Aprendizaje rápido de nuevas tecnologías', 'Atención a detalles de interfaz y experiencia']
for s in strengths:
    pdf.cell(4)  # indent
    pdf.cell(0,6,'- '+s,ln=True)
pdf.ln(2)

# projects
pdf.set_font('Arial','B',14)
pdf.set_text_color(14,78,137)
pdf.cell(0,8,'Proyectos destacados',ln=True)
pdf.set_font('Arial','',11)
pdf.set_text_color(0)
projects = [
    ('Dashboard UI Kit','Aplicación administrativa responsive con React y Tailwind.'),
    ('E-commerce Landing','Página de aterrizaje optimizada para conversión.'),
    ('API Platform','API REST escalable usando Node.js y MongoDB.')
]
for title, desc in projects:
    pdf.set_font('Arial','B',11)
    pdf.cell(4)
    pdf.cell(0,6,title,ln=True)
    pdf.set_font('Arial','',11)
    pdf.set_text_color(80)
    pdf.cell(8)
    pdf.multi_cell(0,6,desc)
    pdf.set_text_color(0)
pdf.ln(2)

# education
pdf.set_font('Arial','B',14)
pdf.set_text_color(14,78,137)
pdf.cell(0,8,'Educación',ln=True)
pdf.set_font('Arial','',11)
pdf.set_text_color(0)
pdf.cell(4)
pdf.cell(0,6,'Ingeniería de Software - Universidad XYZ (2020 - 2024)',ln=True)
pdf.ln(2)

# skills
pdf.set_font('Arial','B',14)
pdf.set_text_color(14,78,137)
pdf.cell(0,8,'Habilidades técnicas',ln=True)
pdf.set_font('Arial','',11)
pdf.set_text_color(0)
skills = ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'PHP', 'MySQL', 'Git']
for skill in skills:
    pdf.cell(4)
    pdf.cell(0,6,'- '+skill,ln=True)

# output
pdf.output('cv.pdf')
print('cv.pdf generated')
