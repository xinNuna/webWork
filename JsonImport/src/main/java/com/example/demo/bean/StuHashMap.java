package com.example.demo.bean;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class StuHashMap<K, V> extends HashMap<K, V> {
    @Override
    public String toString() {
        Set<Map.Entry<K, V>> keyset = this.entrySet();
        Iterator<Entry<K, V>> i = keyset.iterator();
        if (!i.hasNext())
            return "{}";
        StringBuffer buffer = new StringBuffer();
        buffer.append('{');
        for (; ; ) {
            Map.Entry<K, V> me = i.next();
            K key = me.getKey();
            V value = me.getValue();
            buffer.append("\"" + key.toString() + "\":");
            buffer.append(value.toString());
            if (!i.hasNext())
                return buffer.append('}').toString();
            buffer.append(',');
        }
    }
}
