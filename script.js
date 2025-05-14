document.addEventListener('DOMContentLoaded', function() {
    //aktifkan tilt
  $(document).ready(function () {
    $('.js-tilt').tilt({
      scale: 1.1,
      glare: true,
      "max-glare": 0.2
    });
  });


    //  menggulir halaman ke elemen tujuan dengan animasi halus
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // menutup navabar ketia lagi mode mobile, atau menutup otomatis jika sudah memilih menu
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
    // Fungsi untuk mendeteksi dan memperbaiki overflow, atau  mencegah masalah scroll horizontal karena ada elemen yang kebesaran.
function fixOverflow() {
    const docWidth = document.documentElement.offsetWidth;
    [].forEach.call(
        document.querySelectorAll('*'),
        function(el) {
            if (el.offsetWidth > docWidth) {
                console.log('Elemen penyebab overflow:', el);
                el.style.maxWidth = '100%';
            }
        }
    );
}

// Jalankan saat load dan resize dan Fungsinya untuk meningkatkan performa (tidak terlalu sering dipanggil)
window.addEventListener('load', fixOverflow);
window.addEventListener('resize', debounce(fixOverflow, 250));

// Fungsi debounce untuk optimasi
function debounce(func, wait) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}

    //  untuk mengubah tampilan navbar 
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // memfilter gallery apa yang akan ditampilkan
    const filterButtons = document.querySelectorAll('.filter-btn');
    // mengambil semua item galeri (misalnya gambar atau card) yang akan ditampilkan/sembunyikan
    const galleryItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Semua tombol dihapus class active
            filterButtons.forEach(btn => btn.classList.remove('active')); //agar hanya tombol yang diklik yang aktif, dan lainnya tidak
            
            // Tombol yang diklik diberi class active
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Fungsi untuk mengirim pesan dan tampilkan pesan
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Pesan Anda telah terkirim! Terima kasih.');
            this.reset();
        });
    }
    
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Komentar Anda telah terkirim! Terima kasih.');
            this.reset();
        });
    }
    
    //  mengecek elemen mana yang sedang masuk ke layar (viewport)
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-card, .article-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Fungsi untuk inisialisasi chart atau membuat grafik
    function initCharts() {
        // Hancurkan chart yang sudah ada jika ada
        if (typeof radarChart !== 'undefined') radarChart.destroy();
        if (typeof doughnutChart !== 'undefined') doughnutChart.destroy();

        // Radar Chart
        const radarCtx = document.getElementById('radarChart');
        if (radarCtx) {
            radarChart = new Chart(radarCtx.getContext('2d'), {
                type: 'radar',
                data: {
                    labels: ['HTML/CSS', 'JavaScript', 'Bootstrap', 'React', 'UI/UX', 'SEO'],
                    datasets: [{
                        label: 'Tingkat Keahlian',
                        data: [95, 85, 90, 75, 80, 70],
                        backgroundColor: 'rgba(13, 110, 253, 0.2)',
                        borderColor: 'rgba(13, 110, 253, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(13, 110, 253, 1)',
                        pointRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        r: {
                            angleLines: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            pointLabels: {
                                color: '#fff',
                                font: {
                                    size: window.innerWidth < 768 ? 10 : 12
                                }
                            },
                            ticks: {
                                display: false,
                                backdropColor: 'transparent'
                            },
                            suggestedMin: 50,
                            suggestedMax: 100
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#fff',
                                font: {
                                    size: window.innerWidth < 768 ? 12 : 14
                                }
                            }
                        }
                    }
                }
            });
        }

        // membuat Doughnut Chart
        const doughnutCtx = document.getElementById('doughnutChart');
        if (doughnutCtx) {
            doughnutChart = new Chart(doughnutCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Frontend', 'Backend', 'Design', 'Database'],
                    datasets: [{
                        data: [65, 20, 10, 5],
                        backgroundColor: [
                            'rgba(13, 110, 253, 0.8)',
                            'rgba(108, 117, 125, 0.8)',
                            'rgba(255, 193, 7, 0.8)',
                            'rgba(25, 135, 84, 0.8)'
                        ],
                        borderColor: [
                            'rgba(13, 110, 253, 1)',
                            'rgba(108, 117, 125, 1)',
                            'rgba(255, 193, 7, 1)',
                            'rgba(25, 135, 84, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: window.innerWidth < 768 ? 'bottom' : 'right',
                            labels: {
                                color: '#fff',
                                font: {
                                    size: window.innerWidth < 768 ? 12 : 14
                                },
                                padding: 20
                            }
                        }
                    },
                    cutout: window.innerWidth < 768 ? '60%' : '70%'
                }
            });
        }
    }

    // Deklarasikan variabel chart di luar fungsi
    let radarChart, doughnutChart;

    // Inisialisasi chart pertama kali atau menampilkan nya
    initCharts();

    // menangani ukuran layar event
    const handleResize = debounce(() => {
        // Perbaikan khusus untuk hero section
        const hero = document.querySelector('.hero-section');
        if (window.innerWidth < 768) {
            hero.style.minHeight = 'auto';
        } else {
            hero.style.minHeight = '100vh';
        }
        
        // Update charts saat resize
        initCharts();
    }, 250);

    // Fungsi debounce untuk optimasi performa
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }

    // Jalankan saat load dan resize
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
    
    // Set semua elemen yang akan dianimasi 
    document.querySelectorAll('.service-card, .portfolio-card, .article-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); //  akan mengubah kembali ke normal (seolah-olah “muncul dari bawah”)
});