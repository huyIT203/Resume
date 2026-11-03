import { useState, startTransition, addTransitionType } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, Download, Mail, Terminal, ExternalLink, Layers, Smartphone, Copy, Check, ChevronDown, GraduationCap, Button, Reveal, Collapsible, CollapsibleTrigger, CollapsibleContent, ProjectActions, PageTransitionShared } from '../components/ui'
import { copy, projects, type Project } from '../content'
import { CV_URL, EMAIL, usePortfolio } from '../navigation/PortfolioContext'

export function BackLink({ to = '/projects', children }: { to?: string; children: React.ReactNode }) {
  const navigate = useNavigate()
  return <Link className="page-back" to={to} onClick={(event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    startTransition(() => { addTransitionType('nav-back'); navigate(to) })
  }}><ArrowLeft size={16} animateOnHover/>{children}</Link>
}

export function FeatureMap({ project, hero = false }: { project: Project; hero?: boolean }) {
  const { locale } = usePortfolio()
  const i = locale === 'vi' ? 0 : 1
  const ModuleIcons = [Layers, Terminal, Smartphone]
  return <div className={`feature-map ${project.color} ${hero ? 'hero-map' : ''}`} aria-label={`${copy[locale].diagram}: ${project.name}`}>
    <div className="map-top"><span className="map-app-icon">{project.name.charAt(0).toLowerCase()}</span><span>{project.name}<small>{project.domain[i]}</small></span><Layers size={15} aria-hidden="true"/></div>
    <div className="map-content"><div className="map-kicker">{locale === 'vi' ? 'KẾT NỐI NGHIỆP VỤ' : 'CONNECTED WORKFLOWS'}</div>
      {project.id === 'mebione' ? <div className="pond-diagram" aria-hidden="true"><div className="pond p1"/><div className="pond p2"/><div className="pond p3"/><div className="pond p4"/><span className="pond-link"/><div className="pond-hub">m.</div><span className="sensor s1"/><span className="sensor s2"/></div> : project.id === 'dss' ? <div className="crm-diagram" aria-hidden="true"><span className="crm-node node-one"/><span className="crm-node node-two"/><span className="crm-node node-three"/><span className="crm-orbit"/><div className="crm-person">360<span>Customer</span></div></div> : <div className="shop-diagram" aria-hidden="true"><div className="product-tile tile-one"><span/></div><div className="product-tile tile-two"><span/></div><div className="product-tile tile-three"><span/></div></div>}
      <div className="map-modules">{project.modules[i].slice(0, 3).map((label, index) => { const Icon = ModuleIcons[index]; return <div key={label}><span className="module-glyph"><Icon size={12} aria-hidden="true"/></span><span>{label}</span><ExternalLink className="module-arrow" size={12} aria-hidden="true"/></div> })}</div>
    </div><div className="map-bottom"><span className="tiny-dot"/>{copy[locale].diagram}</div>
  </div>
}

export function StoreLinks({ project }: { project: Project }) {
  if (!project.stores) return null
  return <div className="store-links"><a href={project.stores.google} target="_blank" rel="noreferrer" aria-label={`${project.stores.name} — Google Play`}>Google Play<ExternalLink size={13} animateOnHover/></a><a href={project.stores.apple} target="_blank" rel="noreferrer" aria-label={`${project.stores.name} — App Store`}>App Store<ExternalLink size={13} animateOnHover/></a></div>
}

export function ProjectCard({ project }: { project: Project }) {
  const { locale } = usePortfolio()
  const navigate = useNavigate()
  const i = locale === 'vi' ? 0 : 1
  const c = copy[locale]
  const actions = [
    { label: locale === 'vi' ? 'Mở trang dự án' : 'Open project', onSelect: () => startTransition(() => navigate(`/projects/${project.id}`)), icon: <ArrowRight size={16}/> },
    ...(project.stores ? [{ label: 'Google Play', href: project.stores.google, icon: <ExternalLink size={16}/> }, { label: 'App Store', href: project.stores.apple, icon: <ExternalLink size={16}/> }] : []),
  ]
  return <ProjectActions label={`${locale === 'vi' ? 'Thao tác dự án' : 'Project actions'}: ${project.name}`} actions={actions}>
    <article className={`project-card ${project.color}`}><Link to={`/projects/${project.id}`} className="project-cover-link" aria-label={`${c.detail}: ${project.name}`}><PageTransitionShared name={`cover-${project.id}`}><FeatureMap project={project}/></PageTransitionShared></Link><div className="project-copy"><div className="project-domain">{project.domain[i]}</div><h3><Link to={`/projects/${project.id}`}>{project.name}</Link></h3><p className="store-name">{project.stores ? `${locale === 'vi' ? 'Đã phát hành với tên' : 'Published as'} ${project.stores.name}` : locale === 'vi' ? 'Đang phát triển' : 'In development'}</p><p className="project-summary">{project.summary[i]}</p><div className="tags">{project.stack.slice(0, 3).map(s => <span key={s}>{s}</span>)}</div><Link className="project-toggle" to={`/projects/${project.id}`}><span>{c.detail}</span><ArrowRight size={18} animateOnHover/></Link></div></article>
  </ProjectActions>
}

function PageIntro({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
  return <div className="page-intro"><p className="page-kicker eyebrow">{kicker}</p><h1 className="page-title">{title}</h1>{description && <p className="page-description">{description}</p>}</div>
}

export function HomePage() {
  const { locale } = usePortfolio()
  const c = copy[locale]
  return <><section className="hero section-shell"><div className="hero-copy"><p className="eyebrow">{c.eyebrow}</p><h1>{c.hero1}<br/>{c.hero2}<br/><span>{c.hero3}</span></h1><p className="hero-intro">{c.intro}</p><div className="hero-actions"><Button asChild className="button button-dark"><Link to="/projects">{c.view}<ArrowRight size={18} animateOnHover/></Link></Button><Button asChild className="button button-text"><a href={CV_URL} download>{c.cv}<Download size={18} animateOnHover/></a></Button></div><div className="employment"><span className="status-light"/><div><strong>{locale === 'vi' ? 'Đang làm việc tại Mebisoft' : c.current}</strong><span>{c.job} · {c.since}</span></div></div></div><div className="hero-art"><div className="hero-visual"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="floating-label label-flutter"><Smartphone size={21} aria-hidden="true"/>Flutter</div><div className="floating-label label-rn"><Terminal size={21} aria-hidden="true"/>React Native</div><div className="phone-shell"><div className="phone-camera"/><FeatureMap project={projects[0]} hero/></div><div className="hero-caption"><span className="caption-line"/>{c.heroNote}</div></div></div></section><div className="technology-strip">{['FLUTTER', 'REACT NATIVE', 'TYPESCRIPT', 'DART', 'REST APIs'].map((s, i) => <span className="technology-strip-item" key={s}>{i > 0 && <Terminal size={16} aria-hidden="true"/>}{s}</span>)}</div><section className="selected-work work-section section-shell"><div className="section-heading"><div><p className="eyebrow">{c.selected}</p><h2>{c.workTitle}</h2></div><Link to="/projects" className="text-link">{locale === 'vi' ? 'Tất cả dự án' : 'All projects'}<ArrowRight size={17} animateOnHover/></Link></div><div className="projects-grid">{projects.map(project => <ProjectCard key={project.id} project={project}/>)}</div></section><section className="home-note section-shell"><div><p className="eyebrow">{c.aboutLabel}</p><h2>{locale === 'vi' ? 'Mobile developer. Tư duy sản phẩm.' : 'Mobile developer. Product-minded.'}</h2><p>{c.aboutText}</p></div><Button asChild className="button button-outline"><Link to="/about">{locale === 'vi' ? 'Một chút về tôi' : 'A little about me'}<ArrowRight size={17} animateOnHover/></Link></Button></section></>
}

export function ProjectsPage() {
  const { locale } = usePortfolio()
  const c = copy[locale]
  const [filter, setFilter] = useState('all')
  const visibleProjects = projects.filter(p => filter === 'all' || (filter === 'flutter' ? p.id === 'dss' : p.id !== 'dss'))
  return <div className="page-shell section-shell"><PageIntro kicker={c.selected} title={c.workTitle} description={c.workIntro}/><div className="project-filter" role="group" aria-label={c.filterLabel}>{[['all', c.all], ['react-native', 'React Native'], ['flutter', 'Flutter']].map(([value, label]) => <Button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}{value === 'all' && <span>3</span>}</Button>)}</div><div className="projects-grid">{visibleProjects.map(project => <ProjectCard key={project.id} project={project}/>)}</div><p className="privacy-note">{c.sourceNote}</p><div className="personal-section"><div className="section-heading"><div><p className="eyebrow">{c.personal}</p><h2>{c.personalTitle}</h2></div><Terminal size={26} aria-hidden="true"/></div><div className="personal-grid">{[{ name: 'Outfit Planner', desc: c.outfit, stack: 'Flutter · BLoC · Dio', url: 'https://github.com/huyIT203/outfit-planner' }, { name: 'Food API', desc: c.food, stack: 'Java · Spring Boot · PostgreSQL', url: 'https://github.com/huyIT203/food-api' }].map(p => <a className="personal-card" key={p.name} href={p.url} target="_blank" rel="noreferrer"><div><h3>{p.name}</h3><p>{p.desc}</p><span>{p.stack}</span></div><ExternalLink size={21} animateOnHover/></a>)}</div></div></div>
}

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find(p => p.id === slug)
  const { locale } = usePortfolio()
  const c = copy[locale]
  const i = locale === 'vi' ? 0 : 1
  if (!project) return <NotFoundPage/>
  return <div className="page-shell section-shell project-detail-page"><BackLink>{locale === 'vi' ? 'Tất cả dự án' : 'All projects'}</BackLink><div className="project-detail-grid"><div className="project-detail-main"><PageIntro kicker={project.domain[i]} title={project.name} description={project.summary[i]}/><PageTransitionShared name={`cover-${project.id}`} className="project-detail-cover"><FeatureMap project={project}/></PageTransitionShared><section className="detail-section"><h2>{locale === 'vi' ? 'Bối cảnh sản phẩm' : 'Product context'}</h2><p>{project.detail[i]}</p></section><Collapsible defaultOpen className="module-disclosure"><CollapsibleTrigger className="module-disclosure-trigger"><span><Layers size={20} aria-hidden="true"/>{c.contribution}</span><ChevronDown size={18} className="disclosure-chevron"/></CollapsibleTrigger><CollapsibleContent className="module-disclosure-content"><ul className="module-list">{project.modules[i].map(module => <li key={module}><Check size={16} aria-hidden="true"/><span>{module}</span></li>)}</ul><p className="module-note">{project.note[i]}</p></CollapsibleContent></Collapsible></div><aside className="project-detail-aside"><div className="project-detail-meta"><p className="eyebrow">{locale === 'vi' ? 'THÔNG TIN DỰ ÁN' : 'PROJECT DETAILS'}</p><dl><div><dt>{locale === 'vi' ? 'Công ty' : 'Company'}</dt><dd>Mebisoft</dd></div><div><dt>{locale === 'vi' ? 'Vai trò' : 'Role'}</dt><dd>Fresher Mobile Developer</dd></div><div><dt>{locale === 'vi' ? 'Trạng thái' : 'Status'}</dt><dd>{project.stores ? locale === 'vi' ? 'Đã phát hành' : 'Published' : locale === 'vi' ? 'Đang phát triển' : 'In development'}</dd></div>{project.stores && <div><dt>{locale === 'vi' ? 'Tên trên store' : 'Store name'}</dt><dd>{project.stores.name}</dd></div>}</dl><h2>{c.stack}</h2><div className="tags">{project.stack.map(s => <span key={s}>{s}</span>)}</div><StoreLinks project={project}/><Button asChild className="button button-dark"><Link to="/contact">{locale === 'vi' ? 'Trao đổi về dự án' : 'Talk about the project'}<Mail size={16} animateOnHover/></Link></Button></div></aside></div></div>
}

export function AboutPage() {
  const { locale } = usePortfolio()
  const c = copy[locale]
  return <div className="page-shell section-shell"><PageIntro kicker={c.aboutLabel} title={locale === 'vi' ? 'Xin chào, tôi là Huy.' : 'Hello, I’m Huy.'} description={c.aboutTitle}/><div className="about-page-grid"><div className="about-portrait"><div className="portrait-backdrop"><img src="/portrait.png" alt="Phạm Quang Huy" width="420" height="480"/><span className="portrait-tag">Phạm Quang Huy<span>Mobile Developer</span></span></div><p className="portrait-caption">Flutter · React Native · Vietnam</p></div><div><p className="about-body">{c.aboutText}</p><p className="about-body muted">{c.aboutText2}</p><div className="timeline"><div><Layers size={18} aria-hidden="true"/><div><strong>Mebisoft</strong><p>{c.job}</p></div><span>{c.jobDate}</span></div><div><GraduationCap size={18} aria-hidden="true"/><div><strong>{c.education}</strong><p>{locale === 'vi' ? 'Đại học Công nghệ TP.HCM' : 'Ho Chi Minh City University of Technology'}</p></div><span>{c.educationDate}</span></div></div><div className="page-actions"><Button asChild className="button button-dark"><a href={CV_URL} download>{c.cv}<Download size={18} animateOnHover/></a></Button><Button asChild className="button button-outline"><Link to="/skills">{locale === 'vi' ? 'Khám phá kỹ năng' : 'Explore my skills'}<ArrowRight size={18} animateOnHover/></Link></Button></div></div></div></div>
}

export function SkillsPage() {
  const { locale } = usePortfolio()
  const c = copy[locale]
  const icons = [Smartphone, Layers, Terminal, Terminal]
  const groups = [['Flutter', 'Dart', 'React Native', 'TypeScript'], ['BLoC', 'Zustand', 'Redux Toolkit / Saga', 'TanStack Query'], ['REST APIs · Dio / Axios', 'JWT · OAuth', 'Firebase · SIP / WebRTC', 'Spring Boot · PostgreSQL · Docker'], c.ways]
  return <div className="page-shell section-shell"><PageIntro kicker={c.skillsLabel} title={c.skillsTitle} description={locale === 'vi' ? 'Những công nghệ tôi sử dụng trong các ứng dụng và dự án thực tế.' : 'Technologies I work with across real applications and projects.'}/><div className="skills-grid">{groups.map((list, index) => { const Icon = icons[index]; return <Reveal inView key={c.skillGroups[index]} className="skill-group"><Icon className="skill-icon" size={25} animateOnHover/><h2>{c.skillGroups[index]}</h2><ul>{list.map(item => <li key={item}>{item}</li>)}</ul></Reveal> })}</div><div className="page-actions"><Button asChild className="button button-dark"><Link to="/projects">{c.view}<ArrowRight size={18} animateOnHover/></Link></Button></div></div>
}

export function ContactPage() {
  const { locale } = usePortfolio()
  const c = copy[locale]
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  async function copyEmail() {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setCopyError(false) }
    catch { setCopyError(true) }
  }
  return <div className="page-shell section-shell"><PageIntro kicker={c.contactLabel} title={c.contactTitle} description={c.contactText}/><div className="contact-page-grid"><div className="contact-panel"><Mail size={29} aria-hidden="true"/><h2>{locale === 'vi' ? 'Bắt đầu bằng một lời chào.' : 'Start with a hello.'}</h2><a className="email-address" href={`mailto:${EMAIL}`}>{EMAIL}</a><div className="page-actions"><Button asChild className="button button-dark"><a href={`mailto:${EMAIL}`}>{c.email}<ExternalLink size={17} animateOnHover/></a></Button><Button className="button button-outline" onClick={copyEmail}>{copied ? c.copied : c.copy}{copied ? <Check size={17}/> : <Copy size={17} animateOnHover/>}</Button></div><p className="copy-status" role="status">{copyError ? c.copyFailed : copied ? c.copied : ''}</p></div><div className="contact-panel contact-profile-links"><p className="eyebrow">{locale === 'vi' ? 'HỒ SƠ & KẾT NỐI' : 'PROFILE & LINKS'}</p><a href="https://github.com/huyIT203" target="_blank" rel="noreferrer"><Terminal size={21} animateOnHover/><span>GitHub<small>huyIT203</small></span><ExternalLink size={17}/></a><a href="https://www.linkedin.com/in/ph%E1%BA%A1mquanghuy" target="_blank" rel="noreferrer"><ExternalLink size={21} animateOnHover/><span>LinkedIn<small>Phạm Quang Huy</small></span><ExternalLink size={17}/></a><a href={CV_URL} download><Download size={21} animateOnHover/><span>{locale === 'vi' ? 'CV tiếng Anh' : 'English CV'}<small>PDF</small></span><ExternalLink size={17}/></a></div></div></div>
}

export function NotFoundPage() {
  const { locale } = usePortfolio()
  return <div className="page-shell section-shell not-found"><p className="eyebrow">404</p><h1>{locale === 'vi' ? 'Trang này chưa có ở đây.' : 'This page isn’t here.'}</h1><p>{locale === 'vi' ? 'Bạn có thể quay lại trang chủ hoặc khám phá các dự án của tôi.' : 'Head back home or explore my projects.'}</p><Button asChild className="button button-dark"><Link to="/home">{locale === 'vi' ? 'Về trang chủ' : 'Back home'}<ArrowLeft size={18} animateOnHover/></Link></Button></div>
}
