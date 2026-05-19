import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, Copy, Users, Check, LogOut, 
  ChevronLeft, ChevronRight, UserPlus, CreditCard, 
  Search, MapPin, Building, Stethoscope, User
} from 'lucide-react';

// ============================================
// DATOS DE COBERTURA MÉDICA COMPLETA
// ============================================

const COBERTURA = {
  "CABA": {
    tipo: "ciudad",
    especialidades: ["ORL", "Laboratorio", "Oftalmología", "Rehabilitación", "Psiquiatría", "Psicoterapia", "Salud Mental", "Cardiología", "Diagnóstico", "Odontología", "Internación Domiciliaria"],
    centros: [
      { nombre: "INSTITUTO DE ORL ARAUZ", direccion: "Tte. Gral Perón 2238" },
      { nombre: "SANATORIO ANCHORENA RECOLETA", direccion: "Anchorena 1872" },
      { nombre: "INSTITUTO QUIRURGICO DEL CALLAO", direccion: "Av. Callao 499" },
      { nombre: "LABORATORIO SAN JOSE", direccion: "Olleros 3487" },
      { nombre: "LIB SALUD", direccion: "AV. SANTA FE 931" },
      { nombre: "ALPI", direccion: "Soler 3945" },
      { nombre: "HOSPITAL BRITANICO", direccion: "PERDRIEL 74" },
      { nombre: "SANATORIO FINOCHIETTO", direccion: "AV. CORDOBA 2678" },
      { nombre: "HALITUS MEDICINA REPRODUCTIVA", direccion: "M. DE ALVEAR 2084" },
      { nombre: "INSTITUTO DE LA VISION", direccion: "M. T. DE ALVEAR 2261" },
      { nombre: "CEMIC SEDE LAS HERAS", direccion: "Av. Las Heras 2939" },
      { nombre: "CEMIC SEDE SAAVEDRA", direccion: "Av. Galván 4102" },
      { nombre: "FUNDACION HOSPITALARIA", direccion: "AV. CRAMER 4601" },
      { nombre: "HOSPITAL SIRIO LIBANES", direccion: "CAMPANA 4658" },
      { nombre: "CLÍNICA ADVENTISTA BELGRANO", direccion: "ESTOMBA 1710" },
      { nombre: "INSTITUTO FLENI", direccion: "Montañeses 2325" },
      { nombre: "FUNDACION FAVALORO", direccion: "AV. BELGRANO 1746" },
      { nombre: "CLÍNICA ALCLA", direccion: "Vuelta de Obligado 3165" },
      { nombre: "CENTRO MEDICO MONSERRAT", direccion: "HIPÓLITO YRIGOYEN 1210" },
      { nombre: "CLINICA SAGRADA FAMILIA", direccion: "Jose Hernandez 1642" },
      { nombre: "CLINICA SANTA ISABEL", direccion: "Av. Directorio 2037" },
      { nombre: "Clinica del Sol", direccion: "Avenida Coronel Díaz 2211" },
      { nombre: "CENTRO MÉDICO VIDA SALUD", direccion: "Bernardo de Irigoyen 330" },
      { nombre: "POLICLÍNICO CENTRAL UOM", direccion: "Av. Hipólito Yrigoyen 3352" }
    ]
  },
  "AMBA Zona Norte": {
    tipo: "zona",
    especialidades: ["Hospitales Generales", "Salud Mental", "Oftalmología", "Diagnóstico", "Centros Médicos"],
    localidades: ["Florida", "Villa Ballester", "San Fernando", "Vicente López", "Villa Adelina", "Jose C. Paz", "Campana", "Pilar", "Escobar", "San Miguel", "Zárate", "Don Torcuato"],
    centros: [
      { nombre: "HOSPITAL PRIVADO MODELO", direccion: "GENERAL ROCA 1811 - FLORIDA" },
      { nombre: "SANATORIO CLÍNICA PRIVADA SANTA MARIA", direccion: "ENRIQUE MARENGO 3908 - VILLA BALLESTER" },
      { nombre: "CLINICA PRIVADA DE SALUD MENTAL", direccion: "SANTA FE 5750 - CARAPACHAY" },
      { nombre: "CLINICA DE OJOS MAIPU", direccion: "MAIPÚ 1223 - VICENTE LÓPEZ" },
      { nombre: "INSTITUTO MEDICO DE OJOS", direccion: "MARENGO 4464 - VILLA BALLESTER" },
      { nombre: "SANATORIO SANTA SOFIA", direccion: "Parana 6599 - VILLA ADELINA" },
      { nombre: "CENTRO INTEGRAL DE LA VISIÓN", direccion: "DE DOMINICIS 944 - CAMPANA" },
      { nombre: "MAS CENTRO MEDICO", direccion: "MORENO 565 - PILAR" },
      { nombre: "CLÍNICA PRIVADA DE OJOS ESCOBAR", direccion: "ALBERDI 366 - ESCOBAR" },
      { nombre: "SANATORIO GENERAL SARMIENTO", direccion: "Av. Pte. J. D. Perón 1796 - SAN MIGUEL" },
      { nombre: "CLÍNICA SAGRADO CORAZÓN", direccion: "Av. Ángel T. Alvear 650 - DON TORCUATO" }
    ]
  },
  "AMBA Zona Sur": {
    tipo: "zona",
    especialidades: ["Hospitales Generales", "Clínicas Privadas", "Diagnóstico por Imágenes", "Salud Mental"],
    localidades: ["Berisso", "La Plata", "Quilmes", "Avellaneda", "Lomas de Zamora", "Banfield", "Berazategui", "Lanús", "Florencio Varela", "Temperley"],
    centros: [
      { nombre: "Sanatorio Argentino del Plata", direccion: "Calle 56 868 - LA PLATA" },
      { nombre: "Instituto Central de Medicina", direccion: "Calle 43 581 - LA PLATA" },
      { nombre: "Clínica Privada de Ojos Santa Lucía", direccion: "Calle 56 625 - LA PLATA" },
      { nombre: "Sanatorio San José de Villa Elisa", direccion: "Calle 15 esq. 55 - VILLA ELISA" },
      { nombre: "CLINICA PRIVADA SANTA LUCIA", direccion: "BROWN 438 - QUILMES" },
      { nombre: "SANATORIO MODELO ADROGUE", direccion: "AVENIDA ESPORA 2250 - BURZACO" },
      { nombre: "CLINICA AVELLANEDA MEDICAL CENTER", direccion: "PALAA 325 - AVELLANEDA" },
      { nombre: "CENTRO DE OJOS LOMAS", direccion: "AV. ALTE. BROWN 2461 - LOMAS DE ZAMORA" },
      { nombre: "CENTRO DE OJOS BANFIELD", direccion: "ALSINA 281 - BANFIELD" },
      { nombre: "SANATORIO SAN JUAN", direccion: "HIPOLITO YRIGOYEN 5132 - LANÚS" }
    ]
  },
  "AMBA Zona Oeste": {
    tipo: "zona",
    especialidades: ["Hospitales Generales", "Clínicas Privadas", "Salud Mental", "Oftalmología", "Pediatría"],
    localidades: ["Moreno", "Ramos Mejía", "San Justo", "Haedo", "Morón", "Ituzaingó", "González Catán", "Castelar", "Luján"],
    centros: [
      { nombre: "CIM MORENO POLICONSULTORIO", direccion: "Bartolomé Mitre 2360 - MORENO" },
      { nombre: "DIAGNOMED", direccion: "Las Heras 16 - RAMOS MEJÍA" },
      { nombre: "GRUPO JUSTO SALUD", direccion: "Paraguay 2259 - SAN JUSTO" },
      { nombre: "HAEDO SALUD", direccion: "Marcos Sastre 35 - HAEDO" },
      { nombre: "RESOCENTRO", direccion: "25 de Mayo 340 - MORÓN" },
      { nombre: "CLÍNICA SANTA CLARA", direccion: "Constituyentes 1072 - MORÓN" },
      { nombre: "CENTRO DE OJOS ITUZAINGO", direccion: "JUNCAL 258 - ITUZAINGO" },
      { nombre: "INST. OFTALMOLOGICO DR. CARLOS TABOADA", direccion: "SARMIENTO 1652 - CASTELAR" },
      { nombre: "CLÍNICA GÜEMES", direccion: "MARIANO MORENO 1360 - LUJÁN" }
    ]
  },
  "Costa Atlántica": {
    tipo: "region",
    especialidades: ["Clínicas Generales", "Traumatología", "Oftalmología", "Gastroenterología"],
    localidades: ["Mar del Plata"],
    centros: [
      { nombre: "CLÍNICA 25 DE MAYO", direccion: "25 de Mayo 3558 - MAR DEL PLATA" },
      { nombre: "CLÍNICA PUEYRREDÓN", direccion: "Av. Colón y Jujuy - MAR DEL PLATA" },
      { nombre: "SANATORIO BELGRANO", direccion: "Belgrano 4329 - MAR DEL PLATA" },
      { nombre: "CLÍNICA DE OJOS STA. LUCIA", direccion: "Jujuy 1466 - MAR DEL PLATA" },
      { nombre: "CENTRO OFTALMOLOGICO", direccion: "Calle 16 998 - MAR DEL PLATA" }
    ]
  },
  "Catamarca": {
    tipo: "provincia",
    especialidades: ["Clínicas Generales", "Pediatría", "Cardiología", "Oftalmología", "Salud Mental"],
    capital: "San Fernando del Valle",
    centros: [
      { nombre: "Clínica del Niño", direccion: "Conessa 151 - SAN FERNANDO DEL VALLE" },
      { nombre: "Sanatorio Pasteur", direccion: "Chacabuco 675 - SAN FERNANDO DEL VALLE" },
      { nombre: "Instituto Médico de la Comunidad", direccion: "Salta 31 - SAN FERNANDO DEL VALLE" },
      { nombre: "Centro Privado de Ojos", direccion: "Caseros 476 - SAN FERNANDO DEL VALLE" },
      { nombre: "Sanatorio Junín", direccion: "Junín 369 - SAN FERNANDO DEL VALLE" }
    ]
  },
  "Chaco": {
    tipo: "provincia",
    especialidades: ["Clínicas Generales", "Cardiología", "Oftalmología", "Traumatología", "Salud Mental"],
    capital: "Resistencia",
    centros: [
      { nombre: "Centro Cardiológico Mitre", direccion: "Mitre 235 - RESISTENCIA" },
      { nombre: "Clínica de Ojos Resistencia", direccion: "Posadas 375 - RESISTENCIA" },
      { nombre: "Instituto Cardiovascular del Chaco", direccion: "Güemes 501 - RESISTENCIA" },
      { nombre: "Sanatorio Modelo", direccion: "Av. Sarmiento 184 - RESISTENCIA" },
      { nombre: "Sanatorio Galeno", direccion: "Necochea 266 - RESISTENCIA" }
    ]
  },
  "Chubut": {
    tipo: "provincia",
    especialidades: ["Clínicas Generales", "Traumatología", "Diagnóstico por Imágenes"],
    capital: "Rawson",
    centros: [
      { nombre: "Clínica Esquel", direccion: "Roca 543 - ESQUEL" },
      { nombre: "Clínica Los Alerces", direccion: "Rivadavia y Antártida Argentina - ESQUEL" },
      { nombre: "Sanatorio Asociacion Española", direccion: "Av. San Martín 576 - COMODORO RIVADAVIA" },
      { nombre: "Clinica Santa Maria", direccion: "Bartolome Mitre 643 - PUERTO MADRYN" }
    ]
  },
  "Córdoba": {
    tipo: "provincia",
    especialidades: ["Polivalentes", "Rehabilitación", "Ginecología", "Oftalmología", "Cardiología", "Traumatología"],
    capital: "Córdoba",
    centros: [
      { nombre: "Clínica Privada Santa María", direccion: "Belisario Roldán 40 - ALTA GRACIA" },
      { nombre: "ALPI - Centro de Rehabilitación", direccion: "San Lorenzo 283 - CÓRDOBA" },
      { nombre: "Hospital Italiano", direccion: "Roma 550 - CÓRDOBA" },
      { nombre: "Sanatorio Allende", direccion: "H. Yrigoyen 384 - CÓRDOBA" },
      { nombre: "Hospital Privado", direccion: "Av. Naciones Unidas 436 - CÓRDOBA" },
      { nombre: "Centro Oftalmologico Alvear", direccion: "Alvear 374 - CÓRDOBA" }
    ]
  },
  "Entre Ríos": {
    tipo: "provincia",
    especialidades: ["Clínicas Polivalentes", "Pediatría", "Cardiología", "Oftalmología", "Salud Mental"],
    capital: "Paraná",
    centros: [
      { nombre: "Sanatorio Concordia", direccion: "1o de Mayo 393 - CONCORDIA" },
      { nombre: "Sanatorio Adventista del Plata", direccion: "25 de Mayo 255 - LIBERTADOR SAN MARTÍN" },
      { nombre: "Clínica Modelo", direccion: "San Martín 1238 - PARANÁ" },
      { nombre: "Instituto Cardiovascular de Entre Ríos", direccion: "Italia 142 - PARANÁ" },
      { nombre: "Sanatorio La Entrerriana", direccion: "Buenos Aires 550 - PARANÁ" }
    ]
  },
  "Jujuy": {
    tipo: "provincia",
    especialidades: ["Clínicas Polivalentes", "Oftalmología", "Traumatología", "Cardiología", "Pediatría"],
    capital: "San Salvador de Jujuy",
    centros: [
      { nombre: "Clínica Ledesma", direccion: "Jujuy 5848 - LIBERTADOR GRAL. SAN MARTÍN" },
      { nombre: "Centro Oftalmológico Perico", direccion: "Av. Belgrano 447 - PERICO" },
      { nombre: "Sanatorio Santa María", direccion: "Aristóbulo del Valle 347 - SAN PEDRO" },
      { nombre: "Clínica Mayo", direccion: "Alvear y Patricias Argentinas - SAN SALVADOR DE JUJUY" },
      { nombre: "Sanatorio San José", direccion: "Juana Manuela Gorriti 791 - SAN SALVADOR DE JUJUY" }
    ]
  },
  "La Pampa": {
    tipo: "provincia",
    especialidades: ["Clínicas Generales", "Diagnóstico por Imágenes", "Cirugía Cardiovascular", "Oftalmología"],
    capital: "Santa Rosa",
    centros: [
      { nombre: "Sanatorio Santa Rosa", direccion: "Av. Mitre 188 - SANTA ROSA" },
      { nombre: "Clínica Argentina", direccion: "Av. San Martín 740 - GENERAL PICO" },
      { nombre: "Clínica Regional", direccion: "Av. San Martín 400 - GENERAL PICO" }
    ]
  },
  "La Rioja": {
    tipo: "provincia",
    especialidades: ["Cardiología", "Clínicas Polivalentes", "Oftalmología", "Maternidad"],
    capital: "La Rioja",
    centros: [
      { nombre: "Sanatorio Rioja", direccion: "Av. Facundo Quiroga 1117 - LA RIOJA" },
      { nombre: "Centro del Ojo", direccion: "Urquiza 965 - LA RIOJA" },
      { nombre: "Sanatorio Colegio Médico", direccion: "Av. Facundo Quiroga 430 - LA RIOJA" }
    ]
  },
  "Mendoza": {
    tipo: "provincia",
    especialidades: ["Clínicas Polivalentes", "Medicina General", "Ginecología", "Traumatología"],
    capital: "Mendoza",
    centros: [
      { nombre: "Clínica Santa María", direccion: "Federico Moreno 1519 - MENDOZA" },
      { nombre: "Clínica Francesa", direccion: "Av. Ejército de los Andes 1696 - DORREGO" },
      { nombre: "Clínica Santa Rosa", direccion: "Las Heras 742 - GUAYMALLÉN" },
      { nombre: "Santa Clara", direccion: "Av. San Martin 835 - MENDOZA" },
      { nombre: "Clinica Cuyo", direccion: "Av. Jose Vicente Zapata 63 - MENDOZA" }
    ]
  },
  "Misiones": {
    tipo: "provincia",
    especialidades: ["Clínicas Generales", "Pediatría", "Cardiología", "Traumatología", "Odontología"],
    capital: "Posadas",
    centros: [
      { nombre: "Sanatorio Regional", direccion: "8 de Septiembre 1121 - ARISTÓBULO DEL VALLE" },
      { nombre: "Instituto Materno Infantil", direccion: "Kennedy 242 - ELDORADO" },
      { nombre: "Sanatorio Buddenberg", direccion: "Av. San Martín 880 - ELDORADO" },
      { nombre: "Sanatorio Derna", direccion: "Gdor. Barreyro 1031 - OBERÁ" }
    ]
  },
  "Neuquén": {
    tipo: "provincia",
    especialidades: ["Clínicas Polivalentes", "Atención Integral", "Diagnóstico"],
    capital: "Neuquén",
    centros: [
      { nombre: "Policlínico Neuquén", direccion: "Rivadavia 250 - NEUQUÉN CAPITAL" },
      { nombre: "Centro Médico del Sur", direccion: "Sarmiento 489 - SAN MARTÍN DE LOS ANDES" }
    ]
  },
  "Río Negro": {
    tipo: "provincia",
    especialidades: ["Clínicas Polivalentes", "Diagnóstico por Imágenes", "Atención Integral"],
    capital: "Viedma",
    centros: [
      { nombre: "Clínica La Merced", direccion: "Azcuénaga 564 - EL BOLSÓN" },
      { nombre: "Sanatorio San Carlos", direccion: "Av. Exequiel Bustillo Km 1 - SAN CARLOS DE BARILOCHE" }
    ]
  },
  "Salta": {
    tipo: "provincia",
    especialidades: ["Clínicas Polivalentes", "Maternidad y Pediatría", "Terapia Intensiva", "Urología", "Salud Mental"],
    capital: "Salta",
    centros: [
      { nombre: "San Rafael", direccion: "Av. Sarmiento 566 - SALTA CAPITAL" },
      { nombre: "Hospital Privado Santa Clara de Asís", direccion: "Urquiza 964 - SALTA CAPITAL" },
      { nombre: "Clínica San Antonio", direccion: "Warnes y Cornejo 260 - TARTAGAL" },
      { nombre: "Sanatorio Modelo", direccion: "Mitre 484 - SALTA CAPITAL" },
      { nombre: "Clínica Cruz Azul", direccion: "Alberdi 359 - SALTA CAPITAL" }
    ]
  },
  "San Juan": {
    tipo: "provincia",
    especialidades: ["Clínicas Polivalentes", "Atención de la mujer y el niño"],
    capital: "San Juan",
    centros: [
      { nombre: "Hospital Privado del Colegio Médico", direccion: "Rivadavia 542 - CAPITAL" },
      { nombre: "CIMyN - Centro Integral de la Mujer y el Niño", direccion: "Catamarca 417 - CAPITAL" },
      { nombre: "Santa Clara", direccion: "Mendoza 612 Sur - SAN JUAN" }
    ]
  },
  "San Luis": {
    tipo: "provincia",
    especialidades: ["Clínicas Polivalentes", "Atención Integral"],
    capital: "San Luis",
    centros: []
  },
  "Santa Cruz": {
    tipo: "provincia",
    especialidades: ["Clínica Polivalente", "Internación", "Urgencias"],
    capital: "Río Gallegos",
    centros: [
      { nombre: "Clinica Medica Santa Cruz", direccion: "M. Moreno 107 - RÍO GALLEGOS" }
    ]
  },
  "Santa Fe": {
    tipo: "provincia",
    especialidades: ["Clínicas Polivalentes", "Oncología", "Cardiología", "Oftalmología", "Salud Mental"],
    capital: "Santa Fe",
    centros: [
      { nombre: "Hospital Español", direccion: "Sarmiento 3150 - ROSARIO" },
      { nombre: "Sanatorio Americano", direccion: "Rioja 1541 - ROSARIO" },
      { nombre: "Sanatorio Británico", direccion: "Paraguay 40 - ROSARIO" },
      { nombre: "Sanatorio de Niños", direccion: "Alvear 863 - ROSARIO" }
    ]
  },
  "Santiago del Estero": {
    tipo: "provincia",
    especialidades: ["Clínicas Generales", "Maternidad", "Pediatría", "Cardiología", "Psiquiatría"],
    capital: "Santiago del Estero",
    centros: [
      { nombre: "Sanatorio Norte", direccion: "25 de Mayo 138 - CAPITAL" },
      { nombre: "Clínica Santa María", direccion: "Av. Belgrano e Hipólito Yrigoyen - LA BANDA" },
      { nombre: "Clínica Yunes", direccion: "Libertad 626 - CAPITAL" },
      { nombre: "Sanatorio 9 de Julio", direccion: "9 de Julio 580 - CAPITAL" }
    ]
  },
  "Tierra del Fuego": {
    tipo: "provincia",
    especialidades: ["Clínica Polivalente", "Internación", "Urgencias"],
    capital: "Ushuaia",
    centros: [
      { nombre: "Sanatorio San Jorge", direccion: "Onachanga 184 - USHUAIA" }
    ]
  },
  "Tucumán": {
    tipo: "provincia",
    especialidades: ["Cardiología", "Fisiatría y Rehabilitación"],
    capital: "San Miguel de Tucumán",
    centros: [
      { nombre: "ITEC", direccion: "Maipú 617 - SAN MIGUEL DE TUCUMÁN" },
      { nombre: "Centro de Rehabilitación y Fisioterapia Mitre", direccion: "Av. Mitre 281 - SAN MIGUEL DE TUCUMÁN" },
      { nombre: "Clinica de los Milagros", direccion: "Jesus Diaz 703 - SAN MIGUEL DE TUCUMÁN" }
    ]
  }
};

// ============================================
// DATOS DE PLANES
// ============================================

const PLANES_AMSAR = [
  {
    id: "individual",
    name: "Individual",
    tag: "MÁS POPULAR",
    precioBase: 69900,
    precioMostrar: "$69.900",
    coberturas: [
      "✓ Urgencias médicas 24/7",
      "✓ Asistencia en farmacias",
      "✓ Telemedicina incluida",
      "✓ Descuentos óptica",
      "✓ Acceso a red de centros médicos"
    ],
  },
  {
    id: "familiar",
    name: "Familiar",
    tag: "COMPLETO",
    precioBase: 129900,
    precioMostrar: "$129.900",
    coberturas: [
      "✓ Todo lo del plan Individual",
      "✓ Cobertura familiar completa",
      "✓ Hijo adicional: $39.900/mes",
      "✓ Asistencia jurídica",
      "✓ Medicina preventiva"
    ],
  },
];

// ============================================
// DATOS DE BENEFICIOS
// ============================================

const BENEFICIOS = [
  {
    id: 1,
    nombre: "YPF",
    descuento: "15% OFF",
    descripcion: "15% de descuento en naftas INFINIA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/YPF_logo_2010.svg/1200px-YPF_logo_2010.svg.png",
    categoria: "Combustible",
    color: "#00a3e0",
    vigencia: "30/06/2024"
  },
  {
    id: 2,
    nombre: "JetSMART",
    descuento: "15% OFF",
    descripcion: "15% de descuento en todos los vuelos",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/JetSMART_Logo.svg/1200px-JetSMART_Logo.svg.png",
    categoria: "Turismo",
    color: "#ff6b35",
    vigencia: "31/08/2024"
  },
  {
    id: 3,
    nombre: "Digital House",
    descuento: "25% OFF",
    descripcion: "25% de descuento en Certificaciones Tech",
    logo: "https://media.licdn.com/dms/image/C4E0BAQGc0I-F8W1-2w/company-logo_200_200/0/1630606891609/digitalhouse_logo?e=2147483647&v=beta&t=Q2Vn8DbdLONwCwTjs9wU0e_K4uTQ6b4AZPQuXmGkZ-4",
    categoria: "Educación",
    color: "#8a2be2",
    vigencia: "05/09/2024"
  },
  {
    id: 4,
    nombre: "On Fit",
    descuento: "40% OFF",
    descripcion: "40% de descuento en plan mensual",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/On_Running_Logo.svg/1200px-On_Running_Logo.svg.png",
    categoria: "Gimnasios",
    color: "#00c853",
    vigencia: "31/05/2025"
  },
  {
    id: 5,
    nombre: "Hertz",
    descuento: "25% OFF",
    descripcion: "25% de descuento en alquiler de autos",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Hertz_logo.svg/1200px-Hertz_logo.svg.png",
    categoria: "Turismo",
    color: "#ffd700",
    vigencia: "31/12/2024"
  },
  {
    id: 6,
    nombre: "Smiles",
    descuento: "100% BONUS",
    descripcion: "Duplicá tus millas por 3 meses",
    logo: "https://logodownload.org/wp-content/uploads/2018/09/smiles-logo-1.png",
    categoria: "Turismo",
    color: "#00a651",
    vigencia: "30/06/2024"
  }
];

const fmt = (n) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

const USUARIO_EJEMPLO = {
  email: "lucas@mutuo.com.ar",
  password: "123456",
  nombre: "Lucas",
  apellido: "Martínez",
  dni: "35123456",
  telefono: "11 2345-6789",
  refUrl: "https://mutuo.ar/ref/LUCAS"
};

// ============================================
// COMPONENTE DE CARRUSEL
// ============================================

function CarruselBeneficios() {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 900) setItemsPerView(2);
      else if (window.innerWidth < 1200) setItemsPerView(3);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxStart = Math.max(0, BENEFICIOS.length - itemsPerView);
  const next = () => setStartIndex(prev => Math.min(prev + 1, maxStart));
  const prev = () => setStartIndex(prev => Math.max(prev - 1, 0));
  const visibleBeneficios = BENEFICIOS.slice(startIndex, startIndex + itemsPerView);

  return (
    <div className="carrusel-section">
      <div className="carrusel-header">
        <h2>🎁 Beneficios exclusivos para vos</h2>
        <p>Descuentos increíbles en las mejores marcas</p>
      </div>
      <div className="carrusel-container">
        <button className="carrusel-arrow prev" onClick={prev} disabled={startIndex === 0}>
          <ChevronLeft size={28} />
        </button>
        <div className="carrusel-track">
          {visibleBeneficios.map(beneficio => (
            <div key={beneficio.id} className="beneficio-card" style={{ borderTopColor: beneficio.color }}>
              <div className="beneficio-logo-wrapper">
                <img 
                  src={beneficio.logo} 
                  alt={beneficio.nombre}
                  className="beneficio-logo"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/200x100/1a1a3a/00e5ff?text=${beneficio.nombre.substring(0, 3)}`;
                  }}
                />
              </div>
              <span className="beneficio-descuento" style={{ background: beneficio.color }}>{beneficio.descuento}</span>
              <h3>{beneficio.nombre}</h3>
              <p>{beneficio.descripcion}</p>
              <div className="beneficio-footer">
                <span className="beneficio-categoria">{beneficio.categoria}</span>
                <span className="beneficio-vigencia">📅 {beneficio.vigencia}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="carrusel-arrow next" onClick={next} disabled={startIndex >= maxStart}>
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE DE COBERTURA (Buscador y Selector)
// ============================================

function CoberturaSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultados, setResultados] = useState([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
  const [centrosFiltrados, setCentrosFiltrados] = useState([]);
  const [tabActiva, setTabActiva] = useState("buscador");

  // Función de búsqueda
  const buscarCentros = (termino) => {
    if (!termino || termino.length < 2) {
      setResultados([]);
      return;
    }

    const searchLower = termino.toLowerCase();
    const encontrados = [];

    Object.entries(COBERTURA).forEach(([ubicacion, data]) => {
      data.centros?.forEach(centro => {
        if (centro.nombre.toLowerCase().includes(searchLower) || 
            centro.direccion.toLowerCase().includes(searchLower)) {
          encontrados.push({
            ubicacion,
            tipo: data.tipo,
            nombre: centro.nombre,
            direccion: centro.direccion,
            especialidades: data.especialidades?.slice(0, 3)
          });
        }
      });
    });

    setResultados(encontrados);
  };

  useEffect(() => {
    buscarCentros(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (provinciaSeleccionada && COBERTURA[provinciaSeleccionada]) {
      setCentrosFiltrados(COBERTURA[provinciaSeleccionada].centros || []);
    } else {
      setCentrosFiltrados([]);
    }
  }, [provinciaSeleccionada]);

  return (
    <div className="cobertura-container">
      <div className="cobertura-tabs">
        <button 
          className={`tab-btn ${tabActiva === "buscador" ? "active" : ""}`}
          onClick={() => setTabActiva("buscador")}
        >
          <Search size={16} style={{ display: 'inline', marginRight: '8px' }} />
          Buscador
        </button>
        <button 
          className={`tab-btn ${tabActiva === "selector" ? "active" : ""}`}
          onClick={() => setTabActiva("selector")}
        >
          <MapPin size={16} style={{ display: 'inline', marginRight: '8px' }} />
          Por ubicación
        </button>
      </div>

      {tabActiva === "buscador" ? (
        <div className="buscador-cobertura">
          <div className="buscador-input-group">
            <input
              type="text"
              className="buscador-input"
              placeholder="Buscar por nombre del centro médico o dirección..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="resultados-lista">
            {resultados.length > 0 ? (
              resultados.map((r, idx) => (
                <div key={idx} className="resultado-card">
                  <div className="resultado-nombre">{r.nombre}</div>
                  <div className="resultado-direccion">{r.direccion}</div>
                  <div>
                    <span className="resultado-ubicacion">{r.ubicacion}</span>
                    {r.especialidades?.map((esp, i) => (
                      <span key={i} className="resultado-especialidades">{esp}</span>
                    ))}
                  </div>
                </div>
              ))
            ) : searchTerm.length >= 2 ? (
              <div className="sin-resultados">
                No se encontraron centros médicos para "{searchTerm}"
              </div>
            ) : (
              <div className="sin-resultados">
                🔍 Ingresá al menos 2 caracteres para comenzar a buscar
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="buscador-cobertura">
          <div className="selectores-cobertura">
            <div className="selector-group">
              <label><MapPin size={14} /> Seleccionar ubicación</label>
              <select 
                value={provinciaSeleccionada} 
                onChange={(e) => setProvinciaSeleccionada(e.target.value)}
              >
                <option value="">Todas las ubicaciones</option>
                {Object.keys(COBERTURA).sort().map(ubicacion => (
                  <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
                ))}
              </select>
            </div>
          </div>

          {provinciaSeleccionada && (
            <div className="centros-por-ubicacion">
              <h4>
                <Building size={16} style={{ display: 'inline', marginRight: '8px' }} />
                Centros médicos en {provinciaSeleccionada}
              </h4>
              {centrosFiltrados.length > 0 ? (
                centrosFiltrados.map((centro, idx) => (
                  <div key={idx} className="centro-item">
                    <div className="centro-nombre">{centro.nombre}</div>
                    <div className="centro-direccion">{centro.direccion}</div>
                  </div>
                ))
              ) : (
                <div className="sin-resultados" style={{ padding: '20px' }}>
                  No hay centros médicos registrados en esta ubicación
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// COMPONENTE DE LOGIN MODAL
// ============================================

function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === USUARIO_EJEMPLO.email && password === USUARIO_EJEMPLO.password) {
      onLogin(USUARIO_EJEMPLO);
      onClose();
    } else {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-login" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <HeartHandshake size={48} color="#00e5ff" />
          <h2>Bienvenido de vuelta</h2>
          <p>Ingresá a tu cuenta para gestionar tus afiliados</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="btn-login">Ingresar</button>
        </form>
        <div className="login-demo">
          <p>🔑 Usuario de demostración:</p>
          <code>lucas@mutuo.com.ar / 123456</code>
        </div>
      </div>
    </div>
  );
}

// ============================================
// PANEL DE USUARIO
// ============================================

function UserPanel({ usuario, afiliados, onLogout, onShowForm }) {
  const [copied, setCopied] = useState(false);
  const activos = afiliados.filter(a => a.estado === "activo").length;
  const mrr = afiliados.filter(a => a.estado === "activo").reduce((s, a) => s + a.monto, 0);

  const handleCopy = () => {
    navigator.clipboard?.writeText(usuario.refUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="user-panel">
      <div className="user-panel-header">
        <div className="user-info">
          <div className="user-avatar">{usuario.nombre.charAt(0)}{usuario.apellido.charAt(0)}</div>
          <div>
            <h3>{usuario.nombre} {usuario.apellido}</h3>
            <p>{usuario.email} · DNI: {usuario.dni}</p>
          </div>
        </div>
        <div className="user-actions">
          <button className="btn-nuevo-afiliado" onClick={onShowForm}>
            <UserPlus size={18} /> Nueva afiliación
          </button>
          <button className="btn-logout" onClick={onLogout}>
            <LogOut size={18} /> Salir
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{activos}</h3>
          <p>Socios activos</p>
        </div>
        <div className="stat-card">
          <h3>{afiliados.length}</h3>
          <p>Total afiliados</p>
        </div>
        <div className="stat-card">
          <h3>{fmt(mrr)}</h3>
          <p>MRR mensual</p>
        </div>
      </div>

      <div className="referral-box">
        <div className="ref-title"><Users size={18} /> Tu enlace de referidos</div>
        <div className="ref-link">{usuario.refUrl}</div>
        <button className="btn-copy" onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "¡Copiado!" : "Copiar enlace"}
        </button>
      </div>

      <div className="afiliados-list">
        <h4>📋 Mis afiliados ({afiliados.length})</h4>
        {afiliados.length === 0 ? (
          <div className="empty-message">Aún no tenés afiliados. ¡Compartí tu enlace!</div>
        ) : (
          afiliados.map(a => (
            <div key={a.id} className="afiliado-card">
              <div className="afiliado-avatar">{a.nombre.charAt(0)}</div>
              <div className="afiliado-details">
                <strong>{a.nombre}</strong>
                <span>{a.plan === "individual" ? "Plan Individual" : "Plan Familiar"}</span>
                <small>Alta: {a.fecha}</small>
              </div>
              <div className="afiliado-monto">{fmt(a.monto)}<span>/mes</span></div>
              <span className={`estado ${a.estado}`}>{a.estado}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================
// FORMULARIO DE AFILIACIÓN
// ============================================

function AfiliacionModal({ onClose, onAddAfiliado }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    telefono: "",
    plan: "individual",
    pago: "cbu"
  });
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  const planSeleccionado = PLANES_AMSAR.find(p => p.id === formData.plan);
  const monto = formData.pago === "cbu" ? planSeleccionado.precioBase : Math.round(planSeleccionado.precioBase * 1.29);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validar = () => {
    const nuevos = {};
    if (!formData.nombre.trim()) nuevos.nombre = "Requerido";
    if (!formData.apellido.trim()) nuevos.apellido = "Requerido";
    if (!formData.dni.trim() || !/^\d{7,8}$/.test(formData.dni)) nuevos.dni = "DNI inválido (7-8 dígitos)";
    if (!formData.email.trim() || !formData.email.includes("@")) nuevos.email = "Email inválido";
    if (!formData.telefono.trim()) nuevos.telefono = "Requerido";
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const handleSubmit = () => {
    if (!validar()) return;
    onAddAfiliado({
      id: Date.now(),
      nombre: `${formData.nombre} ${formData.apellido}`,
      plan: formData.plan,
      monto: monto,
      estado: "activo",
      fecha: new Date().toISOString().slice(0, 10),
    });
    setExito(true);
    setTimeout(() => {
      setExito(false);
      onClose();
    }, 2000);
  };

  if (exito) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-exito" onClick={(e) => e.stopPropagation()}>
          <div className="exito-icono">🎉</div>
          <h3>¡Afiliación exitosa!</h3>
          <p>{formData.nombre} {formData.apellido} fue agregado al plan {planSeleccionado.name}</p>
          <button className="btn-primary" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-formulario" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2><UserPlus size={24} /> Nueva afiliación</h2>
        
        <div className="form-group">
          <label>Plan seleccionado</label>
          <select name="plan" value={formData.plan} onChange={handleChange} className="form-select">
            {PLANES_AMSAR.map(p => <option key={p.id} value={p.id}>{p.name} - {p.precioMostrar}/mes</option>)}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nombre</label>
            <input name="nombre" className={`form-input ${errores.nombre ? "error" : ""}`} value={formData.nombre} onChange={handleChange} />
            {errores.nombre && <span className="error-msg">{errores.nombre}</span>}
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input name="apellido" className={`form-input ${errores.apellido ? "error" : ""}`} value={formData.apellido} onChange={handleChange} />
            {errores.apellido && <span className="error-msg">{errores.apellido}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>DNI</label>
            <input name="dni" className={`form-input ${errores.dni ? "error" : ""}`} value={formData.dni} onChange={handleChange} />
            {errores.dni && <span className="error-msg">{errores.dni}</span>}
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input name="telefono" className={`form-input ${errores.telefono ? "error" : ""}`} value={formData.telefono} onChange={handleChange} />
            {errores.telefono && <span className="error-msg">{errores.telefono}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" className={`form-input ${errores.email ? "error" : ""}`} value={formData.email} onChange={handleChange} />
          {errores.email && <span className="error-msg">{errores.email}</span>}
        </div>

        <div className="form-group">
          <label>Modalidad de pago</label>
          <div className="pago-opciones">
            <div className={`pago-opcion ${formData.pago === "cbu" ? "activa" : ""}`} onClick={() => setFormData({...formData, pago: "cbu"})}>
              <CreditCard size={18} />
              <div>
                <strong>CBU / Débito</strong>
                <small>{fmt(planSeleccionado.precioBase)}/mes</small>
              </div>
            </div>
            <div className={`pago-opcion ${formData.pago === "efectivo" ? "activa" : ""}`} onClick={() => setFormData({...formData, pago: "efectivo"})}>
              <CreditCard size={18} />
              <div>
                <strong>Efectivo</strong>
                <small>{fmt(Math.round(planSeleccionado.precioBase * 1.29))}/mes</small>
              </div>
            </div>
          </div>
        </div>

        <div className="monto-total">
          <span>Monto mensual:</span>
          <strong>{fmt(monto)}</strong>
        </div>

        <button className="btn-submit" onClick={handleSubmit}>Confirmar afiliación</button>
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE PRINCIPAL APP
// ============================================

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [afiliados, setAfiliados] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleLogin = (user) => {
    setUsuario(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsuario(null);
    setAfiliados([]);
  };

  const handleAddAfiliado = (nuevo) => {
    setAfiliados([nuevo, ...afiliados]);
  };

  return (
    <div className="app">
      <div className="bg-glow" />
      
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <div className="logo-icon"><HeartHandshake size={28} /></div>
          <span className="logo-text">MUTUO</span>
        </div>
        <div className="header-actions">
          {isLoggedIn ? (
            <div className="user-badge">
              <User size={18} />
              <span>{usuario.nombre}</span>
            </div>
          ) : (
            <button className="btn-login-nav" onClick={() => setShowLogin(true)}>
              <User size={18} /> Mi cuenta
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Tu comunidad de asistencia y beneficios</h1>
          <p>Cobertura médica AMSAR, asistencia legal y beneficios exclusivos para jóvenes, familias y trabajadores independientes.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => setShowForm(true)}>Afiliarme ahora</button>
            <button className="btn-secondary" onClick={() => document.getElementById('planes').scrollIntoView({ behavior: 'smooth' })}>Ver planes</button>
          </div>
        </div>
      </section>

      {/* Sección de Cobertura */}
      <CoberturaSection />

      {/* Planes Section */}
      <section id="planes" className="planes-section">
        <h2>Elegí tu cobertura</h2>
        <div className="planes-grid">
          {PLANES_AMSAR.map(plan => (
            <div key={plan.id} className="plan-card">
              {plan.tag && <div className="plan-badge">{plan.tag}</div>}
              <h3>{plan.name}</h3>
              <div className="plan-price">{plan.precioMostrar}<span>/mes</span></div>
              <ul className="plan-features">
                {plan.coberturas.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
              <button className="btn-plan" onClick={() => setShowForm(true)}>Elegir plan</button>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios Carrusel */}
      <CarruselBeneficios />

      {/* Panel de usuario */}
      {isLoggedIn && (
        <section className="user-dashboard">
          <UserPanel 
            usuario={usuario}
            afiliados={afiliados}
            onLogout={handleLogout}
            onShowForm={() => setShowForm(true)}
          />
        </section>
      )}

      {/* Modales */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
      {showForm && <AfiliacionModal onClose={() => setShowForm(false)} onAddAfiliado={handleAddAfiliado} />}
    </div>
  );
}