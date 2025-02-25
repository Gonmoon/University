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
fn is_magic_packet(packet: &[u8]) -> bool {
    if packet.len() < 102 {
        return false;
    }

    // Проверяем первые 6 байтов (должны быть 0xFF)
    for i in 0..6 {
        if packet[i] != 0xFF {
            return false;
        }
    }

    // Проверяем, что MAC-адрес повторяется 16 раз
    let macs = &packet[6..];
    let mac_len = macs.len();
    if mac_len % 6 != 0 {
        return false;
    }

    for i in (0..mac_len).step_by(6) {
        if &macs[i..i + 6] != &macs[0..6] {
            return false;
        }
    }

    true
}
```
## My Contact

<mark>gonmoondark@gmail.com  
You can write to me at any time!</mark>

---
<u>gonmoondark@gmail.com</u>  © 2025
