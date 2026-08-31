document.addEventListener('DOMContentLoaded', function() {
    // 1. Dynamic Greeting
    const greetingElement = document.getElementById('dynamic-greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = 'สวัสดี';
        if (hour < 12) greeting = 'สวัสดีตอนเช้า';
        else if (hour < 18) greeting = 'สวัสดีตอนบ่าย';
        else greeting = 'สวัสดีตอนเย็น';
        
        greetingElement.textContent = `${greeting} ยินดีต้อนรับสู่เว็บไซต์เขื่อนรัชชประภา`;
    }

    // 2. Interactive Button
    const infoBtn = document.getElementById('more-info-btn');
    const alertBox = document.getElementById('info-alert');
    if (infoBtn && alertBox) {
        infoBtn.addEventListener('click', function() {
            if (alertBox.style.display === 'none' || alertBox.style.display === '') {
                alertBox.style.display = 'block';
                this.textContent = 'ซ่อนข้อความพิเศษ';
                // Micro-animation
                alertBox.style.opacity = 0;
                let opacity = 0;
                let interval = setInterval(function() {
                    if (opacity < 1) {
                        opacity += 0.1;
                        alertBox.style.opacity = opacity;
                    } else {
                        clearInterval(interval);
                    }
                }, 30);
            } else {
                alertBox.style.display = 'none';
                this.textContent = 'แสดงข้อความพิเศษ';
            }
        });
    }

    // 3. Image Modal (Lightbox)
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('img01');
    const images = document.querySelectorAll('.image-gallery img');
    const span = document.getElementsByClassName('close')[0];

    if (modal && images.length > 0) {
        images.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
            });
        });

        if (span) {
            span.onclick = function() {
                modal.style.display = 'none';
            }
        }
        
        // Close modal when clicking outside image
        modal.onclick = function(e) {
            if (e.target !== modalImg) {
                modal.style.display = 'none';
            }
        }
    }
});

// Map Function
function getUserLocation() {
    const mapStatus = document.getElementById('map-status');
    const routeBtn = document.getElementById('route-btn');
    
    if (navigator.geolocation) {
        mapStatus.textContent = 'กำลังค้นหาตำแหน่งของคุณ...';
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            mapStatus.innerHTML = `<span style="color: green; font-weight: bold;">พบตำแหน่งของคุณแล้ว!</span> เริ่มต้นการเดินทางได้เลย`;
            
            // Set href for route button
            routeBtn.href = `https://www.google.com/maps/dir/${lat},${lon}/Ratchaprapha+Dam+Surat+Thani`;
            routeBtn.style.display = 'inline-block';
            
        }, function(error) {
            mapStatus.textContent = 'ไม่สามารถดึงตำแหน่งของคุณได้ กรุณาอนุญาตการเข้าถึงตำแหน่งในเบราว์เซอร์ของคุณ';
            routeBtn.style.display = 'none';
        });
    } else {
        mapStatus.textContent = 'เบราว์เซอร์ของคุณไม่รองรับการดึงตำแหน่ง (Geolocation)';
    }
}
