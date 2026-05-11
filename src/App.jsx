import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, Copy, Users, Check, LogOut, 
  ShoppingBag, Tag, ChevronLeft, ChevronRight,
  UserPlus, CreditCard, Calendar, Phone, Mail, MapPin, User
} from 'lucide-react';

// ─── DATOS REALES AMSAR — Plan Contá Conmigo ────────────────────────────────
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
    ],
  },
];

// ─── BENEFICIOS CON IMÁGENES REALES ─────────────────────────────────────────
const BENEFICIOS = [
  {
    id: 1,
    nombre: "YPF",
    descuento: "15% OFF",
    descripcion: "15% de descuento en naftas INFINIA e INFINIA DIESEL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/YPF_logo_2010.svg/1200px-YPF_logo_2010.svg.png",
    imagenFondo: "https://www.ypf.com/Imagenes/og-image.jpg",
    categoria: "Combustible",
    color: "#00a3e0",
    instrucciones: "Usá la App YPF y pagá con dinero en cuenta",
    vigencia: "30/06/2024"
  },
  {
    id: 2,
    nombre: "JetSMART",
    descuento: "15% OFF",
    descripcion: "15% de descuento en todos los vuelos",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/JetSMART_Logo.svg/1200px-JetSMART_Logo.svg.png",
    imagenFondo: "https://www.jetsmart.com/static/img/home/banner-home.jpg",
    categoria: "Turismo",
    color: "#ff6b35",
    instrucciones: "Usá el código promocional en jetsmart.com",
    vigencia: "31/08/2024"
  },
  {
    id: 3,
    nombre: "Digital House",
    descuento: "25% OFF",
    descripcion: "25% de descuento en Certificaciones Tech",
    logo: "https://media.licdn.com/dms/image/C4E0BAQGc0I-F8W1-2w/company-logo_200_200/0/1630606891609/digitalhouse_logo?e=2147483647&v=beta&t=Q2Vn8DbdLONwCwTjs9wU0e_K4uTQ6b4AZPQuXmGkZ-4",
    imagenFondo: "https://www.digitalhouse.com/ar/static/img/dh-og.jpg",
    categoria: "Educación",
    color: "#8a2be2",
    instrucciones: "Ingresá a digitalhouse.com/landing/bonda",
    vigencia: "05/09/2024"
  },
  {
    id: 4,
    nombre: "On Fit",
    descuento: "40% OFF",
    descripcion: "40% de descuento en plan mensual",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/On_Running_Logo.svg/1200px-On_Running_Logo.svg.png",
    imagenFondo: "https://www.onfit.com.ar/images/onfit-gym.jpg",
    categoria: "Gimnasios",
    color: "#00c853",
    instrucciones: "Contactá por WhatsApp para el beneficio",
    vigencia: "31/05/2025"
  },
  {
    id: 5,
    nombre: "Arcor en casa",
    descuento: "10% OFF",
    descripcion: "10% de descuento + envío gratis",
    logo: "https://www.arcor.com.ar/themes/custom/arcor/logo.svg",
    imagenFondo: "https://arcorencasa.com/static/img/banner-home.jpg",
    categoria: "Compras",
    color: "#ff5722",
    instrucciones: "Usá el código en arcorencasa.com",
    vigencia: "30/06/2025"
  },
  {
    id: 6,
    nombre: "Hertz",
    descuento: "25% OFF",
    descripcion: "25% de descuento en alquiler de autos",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Hertz_logo.svg/1200px-Hertz_logo.svg.png",
    imagenFondo: "https://www.hertz.com.ar/assets/images/home/hero.jpg",
    categoria: "Turismo",
    color: "#ffd700",
    instrucciones: "Presentá el código en sucursales",
    vigencia: "31/12/2024"
  },
  {
    id: 7,
    nombre: "Smiles",
    descuento: "100% BONUS",
    descripcion: "Duplicá tus millas por 3 meses",
    logo: "https://logodownload.org/wp-content/uploads/2018/09/smiles-logo-1.png",
    imagenFondo: "https://www.smiles.com.br/assets/images/smiles-share.jpg",
    categoria: "Turismo",
    color: "#00a651",
    instrucciones: "Suscribite al Club 1.000",
    vigencia: "30/06/2024"
  },
  {
    id: 8,
    nombre: "Baires IT",
    descuento: "20% OFF",
    descripcion: "20% extra en tecnología",
    logo: "https://media.licdn.com/dms/image/C4D0BAQFX7qZ9IYwJfQ/company-logo_200_200/0/1630474558767/baires_it_logo?e=2147483647&v=beta&t=8fWtN6p-HQ3Lx2z_XsM9VqjK0rLmNpO1YqR7sT8uVwX",
    imagenFondo: "https://www.bairesit.com.ar/images/banner.jpg",
    categoria: "Tecnología",
    color: "#9c27b0",
    instrucciones: "Usá el código en bairesit.com.ar",
    vigencia: "30/06/2025"
  },
  {
    id: 9,
    nombre: "Multipoint",
    descuento: "20% OFF",
    descripcion: "20% en productos Samsung",
    logo: "https://multipoint.com.ar/img/logo-multipoint.png",
    imagenFondo: "https://multipoint.com.ar/img/banner-samsung.jpg",
    categoria: "Tecnología",
    color: "#1428a0",
    instrucciones: "Usá el código en multipoint.com.ar",
    vigencia: "30/06/2025"
  },
  {
    id: 10,
    nombre: "Giama",
    descuento: "PROMO",
    descripcion: "Beneficios en plan de ahorro",
    logo: "https://giamajeep.com.ar/img/logo-giama.png",
    imagenFondo: "https://giamajeep.com.ar/img/banner-jeep.jpg",
    categoria: "Autos",
    color: "#e30613",
    instrucciones: "Consultá por WhatsApp",
    vigencia: "31/05/2025"
  }
];

const fmt = (n) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

// Usuario de ejemplo
const USUARIO_EJEMPLO = {
  email: "lucas@mutuo.com.ar",
  password: "123456",
  nombre: "Lucas",
  apellido: "Martínez",
  dni: "35123456",
  telefono: "11 2345-6789",
  refUrl: "https://mutuo.ar/ref/LUCAS"
};

// ─── COMPONENTE DE CARRUSEL ─────────────────────────────────────────────────
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

// ─── COMPONENTE DE LOGIN MODAL ──────────────────────────────────────────────
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

// ─── PANEL DE USUARIO LOGUEADO ──────────────────────────────────────────────
function UserPanel({ usuario, afiliados, onLogout, onAddAfiliado, onShowForm }) {
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

// ─── FORMULARIO DE AFILIACIÓN MODAL ─────────────────────────────────────────
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
    if (!formData.dni.trim() || !/^\d{7,8}$/.test(formData.dni)) nuevos.dni = "DNI inválido";
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

// ─── COMPONENTE PRINCIPAL APP ───────────────────────────────────────────────
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

      {/* Panel de usuario (solo cuando está logueado) */}
      {isLoggedIn && (
        <section className="user-dashboard">
          <UserPanel 
            usuario={usuario}
            afiliados={afiliados}
            onLogout={handleLogout}
            onAddAfiliado={handleAddAfiliado}
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