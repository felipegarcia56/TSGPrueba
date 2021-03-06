PGDMP     '                
    w            TSG_resources    12.0    12.0 I    c           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            d           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            e           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            f           1262    16393    TSG_resources    DATABASE     �   CREATE DATABASE "TSG_resources" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
    DROP DATABASE "TSG_resources";
                postgres    false            g           0    0    DATABASE "TSG_resources"    COMMENT     <   COMMENT ON DATABASE "TSG_resources" IS 'TSG test database';
                   postgres    false    2918            �            1259    16433    area    TABLE     �   CREATE TABLE public.area (
    id integer NOT NULL,
    descripcion character varying(200) NOT NULL,
    id_responsable integer
);
    DROP TABLE public.area;
       public         heap    postgres    false            �            1259    16431    area_id_seq    SEQUENCE     �   CREATE SEQUENCE public.area_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.area_id_seq;
       public          postgres    false    211            h           0    0    area_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.area_id_seq OWNED BY public.area.id;
          public          postgres    false    210            �            1259    16417    estado    TABLE     i   CREATE TABLE public.estado (
    id integer NOT NULL,
    descripcion character varying(200) NOT NULL
);
    DROP TABLE public.estado;
       public         heap    postgres    false            �            1259    16415    estado_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estado_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.estado_id_seq;
       public          postgres    false    207            i           0    0    estado_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.estado_id_seq OWNED BY public.estado.id;
          public          postgres    false    206            �            1259    16401    marca    TABLE     h   CREATE TABLE public.marca (
    id integer NOT NULL,
    descripcion character varying(200) NOT NULL
);
    DROP TABLE public.marca;
       public         heap    postgres    false            �            1259    16399    marca_id_seq    SEQUENCE     �   CREATE SEQUENCE public.marca_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.marca_id_seq;
       public          postgres    false    203            j           0    0    marca_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.marca_id_seq OWNED BY public.marca.id;
          public          postgres    false    202            �            1259    16453    persona    TABLE     �   CREATE TABLE public.persona (
    id integer NOT NULL,
    nombre character varying(200) NOT NULL,
    apellido character varying(200) NOT NULL,
    id_responsable integer
);
    DROP TABLE public.persona;
       public         heap    postgres    false            �            1259    16451    persona_id_seq    SEQUENCE     �   CREATE SEQUENCE public.persona_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.persona_id_seq;
       public          postgres    false    213            k           0    0    persona_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.persona_id_seq OWNED BY public.persona.id;
          public          postgres    false    212            �            1259    16409 	   proveedor    TABLE     l   CREATE TABLE public.proveedor (
    id integer NOT NULL,
    descripcion character varying(200) NOT NULL
);
    DROP TABLE public.proveedor;
       public         heap    postgres    false            �            1259    16407    proveedor_id_seq    SEQUENCE     �   CREATE SEQUENCE public.proveedor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.proveedor_id_seq;
       public          postgres    false    205            l           0    0    proveedor_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.proveedor_id_seq OWNED BY public.proveedor.id;
          public          postgres    false    204            �            1259    16474    recurso    TABLE     a  CREATE TABLE public.recurso (
    id integer NOT NULL,
    descripcion character varying(200) NOT NULL,
    serial character varying(200) NOT NULL,
    valor character varying(200) NOT NULL,
    fecha_compra date NOT NULL,
    id_marca integer NOT NULL,
    id_proveedor integer NOT NULL,
    id_estado integer NOT NULL,
    id_tipo integer NOT NULL
);
    DROP TABLE public.recurso;
       public         heap    postgres    false            �            1259    16472    recurso_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recurso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.recurso_id_seq;
       public          postgres    false    217            m           0    0    recurso_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.recurso_id_seq OWNED BY public.recurso.id;
          public          postgres    false    216            �            1259    16503    recurso_responsable    TABLE     �   CREATE TABLE public.recurso_responsable (
    id_recurso integer NOT NULL,
    id_responsable integer NOT NULL,
    fecha_asignacion date NOT NULL
);
 '   DROP TABLE public.recurso_responsable;
       public         heap    postgres    false            �            1259    16425    responsable    TABLE     k   CREATE TABLE public.responsable (
    id integer NOT NULL,
    telefono character varying(200) NOT NULL
);
    DROP TABLE public.responsable;
       public         heap    postgres    false            �            1259    16423    responsable_id_seq    SEQUENCE     �   CREATE SEQUENCE public.responsable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.responsable_id_seq;
       public          postgres    false    209            n           0    0    responsable_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.responsable_id_seq OWNED BY public.responsable.id;
          public          postgres    false    208            �            1259    16466    tipo_recurso    TABLE     o   CREATE TABLE public.tipo_recurso (
    id integer NOT NULL,
    descripcion character varying(200) NOT NULL
);
     DROP TABLE public.tipo_recurso;
       public         heap    postgres    false            �            1259    16464    tipo_recurso_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tipo_recurso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.tipo_recurso_id_seq;
       public          postgres    false    215            o           0    0    tipo_recurso_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.tipo_recurso_id_seq OWNED BY public.tipo_recurso.id;
          public          postgres    false    214            �
           2604    16436    area id    DEFAULT     b   ALTER TABLE ONLY public.area ALTER COLUMN id SET DEFAULT nextval('public.area_id_seq'::regclass);
 6   ALTER TABLE public.area ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            �
           2604    16420 	   estado id    DEFAULT     f   ALTER TABLE ONLY public.estado ALTER COLUMN id SET DEFAULT nextval('public.estado_id_seq'::regclass);
 8   ALTER TABLE public.estado ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �
           2604    16404    marca id    DEFAULT     d   ALTER TABLE ONLY public.marca ALTER COLUMN id SET DEFAULT nextval('public.marca_id_seq'::regclass);
 7   ALTER TABLE public.marca ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            �
           2604    16456 
   persona id    DEFAULT     h   ALTER TABLE ONLY public.persona ALTER COLUMN id SET DEFAULT nextval('public.persona_id_seq'::regclass);
 9   ALTER TABLE public.persona ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    213    213            �
           2604    16412    proveedor id    DEFAULT     l   ALTER TABLE ONLY public.proveedor ALTER COLUMN id SET DEFAULT nextval('public.proveedor_id_seq'::regclass);
 ;   ALTER TABLE public.proveedor ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            �
           2604    16477 
   recurso id    DEFAULT     h   ALTER TABLE ONLY public.recurso ALTER COLUMN id SET DEFAULT nextval('public.recurso_id_seq'::regclass);
 9   ALTER TABLE public.recurso ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �
           2604    16428    responsable id    DEFAULT     p   ALTER TABLE ONLY public.responsable ALTER COLUMN id SET DEFAULT nextval('public.responsable_id_seq'::regclass);
 =   ALTER TABLE public.responsable ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            �
           2604    16469    tipo_recurso id    DEFAULT     r   ALTER TABLE ONLY public.tipo_recurso ALTER COLUMN id SET DEFAULT nextval('public.tipo_recurso_id_seq'::regclass);
 >   ALTER TABLE public.tipo_recurso ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            Y          0    16433    area 
   TABLE DATA           ?   COPY public.area (id, descripcion, id_responsable) FROM stdin;
    public          postgres    false    211   �O       U          0    16417    estado 
   TABLE DATA           1   COPY public.estado (id, descripcion) FROM stdin;
    public          postgres    false    207   P       Q          0    16401    marca 
   TABLE DATA           0   COPY public.marca (id, descripcion) FROM stdin;
    public          postgres    false    203   ?P       [          0    16453    persona 
   TABLE DATA           G   COPY public.persona (id, nombre, apellido, id_responsable) FROM stdin;
    public          postgres    false    213   \P       S          0    16409 	   proveedor 
   TABLE DATA           4   COPY public.proveedor (id, descripcion) FROM stdin;
    public          postgres    false    205   yP       _          0    16474    recurso 
   TABLE DATA           {   COPY public.recurso (id, descripcion, serial, valor, fecha_compra, id_marca, id_proveedor, id_estado, id_tipo) FROM stdin;
    public          postgres    false    217   �P       `          0    16503    recurso_responsable 
   TABLE DATA           [   COPY public.recurso_responsable (id_recurso, id_responsable, fecha_asignacion) FROM stdin;
    public          postgres    false    218   �P       W          0    16425    responsable 
   TABLE DATA           3   COPY public.responsable (id, telefono) FROM stdin;
    public          postgres    false    209   �P       ]          0    16466    tipo_recurso 
   TABLE DATA           7   COPY public.tipo_recurso (id, descripcion) FROM stdin;
    public          postgres    false    215   �P       p           0    0    area_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.area_id_seq', 34, true);
          public          postgres    false    210            q           0    0    estado_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.estado_id_seq', 8, true);
          public          postgres    false    206            r           0    0    marca_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.marca_id_seq', 17, true);
          public          postgres    false    202            s           0    0    persona_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.persona_id_seq', 50, true);
          public          postgres    false    212            t           0    0    proveedor_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.proveedor_id_seq', 9, true);
          public          postgres    false    204            u           0    0    recurso_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.recurso_id_seq', 15, true);
          public          postgres    false    216            v           0    0    responsable_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.responsable_id_seq', 90, true);
          public          postgres    false    208            w           0    0    tipo_recurso_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.tipo_recurso_id_seq', 10, true);
          public          postgres    false    214            �
           2606    16441    area area_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.area
    ADD CONSTRAINT area_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.area DROP CONSTRAINT area_pkey;
       public            postgres    false    211            �
           2606    16422    estado estado_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.estado
    ADD CONSTRAINT estado_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.estado DROP CONSTRAINT estado_pkey;
       public            postgres    false    207            �
           2606    16406    marca marca_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.marca DROP CONSTRAINT marca_pkey;
       public            postgres    false    203            �
           2606    16458    persona persona_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.persona
    ADD CONSTRAINT persona_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.persona DROP CONSTRAINT persona_pkey;
       public            postgres    false    213            �
           2606    16414    proveedor proveedor_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT proveedor_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.proveedor DROP CONSTRAINT proveedor_pkey;
       public            postgres    false    205            �
           2606    16482    recurso recurso_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.recurso
    ADD CONSTRAINT recurso_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.recurso DROP CONSTRAINT recurso_pkey;
       public            postgres    false    217            �
           2606    16507 ,   recurso_responsable recurso_responsable_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.recurso_responsable
    ADD CONSTRAINT recurso_responsable_pkey PRIMARY KEY (id_recurso, id_responsable);
 V   ALTER TABLE ONLY public.recurso_responsable DROP CONSTRAINT recurso_responsable_pkey;
       public            postgres    false    218    218            �
           2606    16430    responsable responsable_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.responsable
    ADD CONSTRAINT responsable_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.responsable DROP CONSTRAINT responsable_pkey;
       public            postgres    false    209            �
           2606    16519    recurso serial_unique 
   CONSTRAINT     R   ALTER TABLE ONLY public.recurso
    ADD CONSTRAINT serial_unique UNIQUE (serial);
 ?   ALTER TABLE ONLY public.recurso DROP CONSTRAINT serial_unique;
       public            postgres    false    217            �
           2606    16471    tipo_recurso tipo_recurso_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.tipo_recurso
    ADD CONSTRAINT tipo_recurso_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.tipo_recurso DROP CONSTRAINT tipo_recurso_pkey;
       public            postgres    false    215            �
           2606    16446    area area_responsable_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.area
    ADD CONSTRAINT area_responsable_fk FOREIGN KEY (id_responsable) REFERENCES public.responsable(id) NOT VALID;
 B   ALTER TABLE ONLY public.area DROP CONSTRAINT area_responsable_fk;
       public          postgres    false    209    211    2749            �
           2606    16493    recurso estado_recurso_fk    FK CONSTRAINT     {   ALTER TABLE ONLY public.recurso
    ADD CONSTRAINT estado_recurso_fk FOREIGN KEY (id_estado) REFERENCES public.estado(id);
 C   ALTER TABLE ONLY public.recurso DROP CONSTRAINT estado_recurso_fk;
       public          postgres    false    2747    207    217            �
           2606    16483    recurso marca_recurso_fk    FK CONSTRAINT     x   ALTER TABLE ONLY public.recurso
    ADD CONSTRAINT marca_recurso_fk FOREIGN KEY (id_marca) REFERENCES public.marca(id);
 B   ALTER TABLE ONLY public.recurso DROP CONSTRAINT marca_recurso_fk;
       public          postgres    false    2743    203    217            �
           2606    16459    persona persona_responsable_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.persona
    ADD CONSTRAINT persona_responsable_fk FOREIGN KEY (id_responsable) REFERENCES public.responsable(id);
 H   ALTER TABLE ONLY public.persona DROP CONSTRAINT persona_responsable_fk;
       public          postgres    false    2749    213    209            �
           2606    16488    recurso proveedor_recurso_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.recurso
    ADD CONSTRAINT proveedor_recurso_fk FOREIGN KEY (id_proveedor) REFERENCES public.proveedor(id);
 F   ALTER TABLE ONLY public.recurso DROP CONSTRAINT proveedor_recurso_fk;
       public          postgres    false    205    217    2745            �
           2606    16508    recurso_responsable recurso_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.recurso_responsable
    ADD CONSTRAINT recurso_fk FOREIGN KEY (id_recurso) REFERENCES public.recurso(id);
 H   ALTER TABLE ONLY public.recurso_responsable DROP CONSTRAINT recurso_fk;
       public          postgres    false    218    2757    217            �
           2606    16513 "   recurso_responsable responsable_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.recurso_responsable
    ADD CONSTRAINT responsable_fk FOREIGN KEY (id_responsable) REFERENCES public.responsable(id);
 L   ALTER TABLE ONLY public.recurso_responsable DROP CONSTRAINT responsable_fk;
       public          postgres    false    209    2749    218            �
           2606    16498    recurso tipo_recurso_fk    FK CONSTRAINT     }   ALTER TABLE ONLY public.recurso
    ADD CONSTRAINT tipo_recurso_fk FOREIGN KEY (id_tipo) REFERENCES public.tipo_recurso(id);
 A   ALTER TABLE ONLY public.recurso DROP CONSTRAINT tipo_recurso_fk;
       public          postgres    false    217    215    2755            Y      x������ � �      U   )   x�3�t*M�SH-.IL��2��Ḿq,8�JS��b���� ��x      Q      x������ � �      [      x������ � �      S      x������ � �      _      x������ � �      `      x������ � �      W      x������ � �      ]   4   x�3�IM���9�9=39�˒�?-393/��Ѐ�91-�$����D�=... Y,t     