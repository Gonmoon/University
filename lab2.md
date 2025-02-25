# Nikolai

---

- [About](#about)
- [Code](#code)
- [Contact](#contact)

---

## About me

Lorem ipsum dolor sit amet, *consectetur adipisicing* elit. Dolores sequi nam cumque ~~similique~~ recusandae quidem, neque, unde soluta repellat sed praesentium laudantium molestias hic dignissimos vitae eos voluptatibus delectus asperiores?  
Lorem, ipsum dolor sit amet consectetur, adipisicing elit. Ipsum non obcaecati magnam reiciendis. Nemo quasi, sapiente voluptas porro similique dicta expedita eos, repudiandae sint tempora rem, ipsa aliquam ipsum ullam!

![MyPhoto](img/img.png)

## My Code

```rust
#[tokio::main]
async fn main() -> Result<()> {
    // Создаем UDP сокет и привязываем его к адресу
    let addr = SocketAddr::new(Ipv4Addr::new(0, 0, 0, 0).into(), WOL_PORT);
    let socket = UdpSocket::bind(&addr).await.unwrap();
    println!("Listening for WOL packets on {}", addr);

    let mut buf = [0; 102]; // Буфер для приема пакетов

    loop {
        let (len, _src) = socket.recv_from(&mut buf).await.unwrap();

        // Проверяем, является ли пакет "magic packet"
        if is_magic_packet(&buf[..len]) {
            #[cfg(target_os = "windows")]
            {
                if !is_admin() {
                    eprintln!("Please run this program as an administrator.");
                    break Ok(());
                }
            }
        
            shutdown();
        }
    }
}
```
## My Contact

<mark>gonmoondark@gmail.com  
You can write to me at any time!</mark>

---
<u>gonmoondark@gmail.com</u>  © 2025
