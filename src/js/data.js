var example_tree = "(((EELA:0.150276,CONGERA:0.213019):0.230956,(EELB:0.263487,CONGERB:0.202633):0.246917):0.094785,((CAVEFISH:0.451027,(GOLDFISH:0.340495,ZEBRAFISH:0.390163):0.220565):0.067778,((((((NSAM:0.008113,NARG:0.014065):0.052991,SPUN:0.061003,(SMIC:0.027806,SDIA:0.015298,SXAN:0.046873):0.046977):0.009822,(NAUR:0.081298,(SSPI:0.023876,STIE:0.013652):0.058179):0.091775):0.073346,(MVIO:0.012271,MBER:0.039798):0.178835):0.147992,((BFNKILLIFISH:0.317455,(ONIL:0.029217,XCAU:0.084388):0.201166):0.055908,THORNYHEAD:0.252481):0.061905):0.157214,LAMPFISH:0.717196,((SCABBARDA:0.189684,SCABBARDB:0.362015):0.282263,((VIPERFISH:0.318217,BLACKDRAGON:0.109912):0.123642,LOOSEJAW:0.397100):0.287152):0.140663):0.206729):0.222485,(COELACANTH:0.558103,((CLAWEDFROG:0.441842,SALAMANDER:0.299607):0.135307,((CHAMELEON:0.771665,((PIGEON:0.150909,CHICKEN:0.172733):0.082163,ZEBRAFINCH:0.099172):0.272338):0.014055,((BOVINE:0.167569,DOLPHIN:0.157450):0.104783,ELEPHANT:0.166557):0.367205):0.050892):0.114731):0.295021)"

var example_tree1 = "(((((((TREESPARROW_HENAN_1_2004:0.0111334,TREESPARROW_HENAN_3_2004:0.00619375)Node6:0.000995666,TREESPARROW_HENAN_4_2004:0.00435165)Node5:0.00226776,(CHICKEN_HEBEI_326_2005:0.0210089,(SWINE_ANHUI_2004:0.00770239,TREESPARROW_HENAN_2_2004:0.00906278)Node12:0.00209522)Node10:0.00388724)Node4:0.00340492,(((CHICKEN_HONGKONG_915_97:1e-10,(GOOSE_HONGKONG_W355_97:1e-10,DUCK_HONGKONG_Y283_97:0.00279842)Node19:0.00289977)Node17:0.00130638,HONGKONG_97_98:0.00384493)Node16:0.000182536,HONGKONG_538_97:1e-10)Node15:0.0209617)Node3:0.00313061,(((DUCK_GUANGZHOU_20_2005:0.00629939,GOOSE_SHANTOU_2216_2005:0.00620784)Node26:0.00253061,PEREGRINEFALCON_HK_D0028_2004:0.0036083)Node25:0.0032889,CK_HK_WF157_2003:0.0066313)Node24:0.0046553)Node2:0.0116809,(((HUMAN_VIETNAM_CL105_2005:0.00652152,DUCK_VIETNAM_376_2005:0.00787762)Node33:0.00196789,VIETNAM_3062_2004:0.0016414)Node32:0.000312551,MALLARD_VIETNAM_16_2003:0.00324422)Node31:0.000412598)Node1:0.000340091,CHICKEN_THAILAND_KANCHANABURI_CK_160_2005:0.00616834,DUCK_VIETNAM_272_2005:0.0094653)"

var example_tree2 = "(((((((TASVd:0.06828169,CSVd:0.06828169)0.8170:0.05635267,CEVd:0.12463435)0.8290:0.06964112,(PSTVd:0.02617095,TCDVd:0.02617095)1.0000:0.16810452)0.6700:0.08751399,CLVd:0.28178947)0.8700:0.13005822,(HSVd:0.26704011,(CCCVd:0.20577326,CVdIV:0.20577326)0.6520:0.06126685)0.8790:0.14480757)0.8810:0.18306776,(((CbVd-2:0.08236826,CbVd-3:0.08236826)0.9300:0.10543001,CbVd-1:0.18779827)0.9970:0.29222981,(PBCVd:0.38569588,(CBLVd:0.30671661,(ASSVd:0.25961362,(CVd-OS:0.14517605,CVDIII:0.14517605)0.9870:0.11443757)0.5950:0.04710299)0.5660:0.07897927)0.7300:0.09433220)0.6860:0.11488736)0.9840:0.46199326,((CCHMVd:0.37098428,PLMVd:0.37098428)0.8850:0.20471288,(ELVd:0.37028264,ASBVd:0.37028264)0.8730:0.20541453)0.9840:0.48121154)"

// 示例数据
var example_tree_fasttree = "(GCA_000591435.1_MR2010_11_27__cloA__EXU97507.1:0.000000005,GCA_000187425.1_MetAni_May2010__cloA__EFY97958.1:0.000000005,(GCA_000187425.2_MAA_2.0__cloA__EFY97958.1:0.000000005,((GCA_000426965.1_ASM42696v1__cloA__KJK79256.1:0.0,GCA_000426985.1_ASM42698v1__cloA__KJK95577.1:0.0):0.007659574,(GCA_000814965.1_MBR_1.0__cloA__KID68986.1:0.014154872,(((GCA_000814975.1_MAN_1.0__cloA__KID65154.1:0.000000005,GCA_000739145.1_Metarhizium_anisopliae__cloA__KFG79548.1:0.000000005)0.898:0.004364554,(GCA_000804445.1_MAM_1.0_for_version_1_of_the_Metarhizium_album_genome__cloA__KHN97497.1:0.141863344,(GCA_000731825.1_ASM73182v1__cloA__462_t:0.457086775,((GCA_000877375.1_EamaE4668v1__cloA__5878_t:0.128772626,(GCA_003012085.1_Trichoderma_brevicompactum_IBT40841_contigs__cloA__4902_t:0.290480210,((GCA_003184865.1_Asphom1__cloA__RAL15190.1:0.195190664,GCA_009176345.1__cloA__KAB8071277.1:0.147594683)1.000:0.152383335,(GCA_004154915.1__cloA__RYP10945.1:0.088765402,(GCA_009193565.1__cloA__KAE8351816.1:0.186047402,((GCA_002120305.1_HypCO275_v1.0__cloA__OTA81174.1:0.038407837,GCA_002120335.1_HypEC38_v3.0__cloA__OTA60878.1:0.026513308)1.000:0.128242424,(GCA_002120325.1_DalEC12_v.1.0__cloA__OTB14165.1:0.036637360,(GCA_000261445.1_ASM26144v1__cloA__13289_t:0.014555542,(GCA_001951055.1_D.eschs_IFB_TL01_1.0__cloA__1573_t:0.005334912,(GCA_000751375.2_UM_1400.v1__cloA__1917_t:0.000000005,GCA_000751375.1_UM_1400.v1__cloA__1960_t:0.001567539)0.764:0.002390105)0.826:0.004873583)0.986:0.027499482)1.000:0.161031540)0.984:0.053105635)0.804:0.014715348)0.812:0.045503958)1.000:0.266367392)0.994:0.145163759)0.986:0.083932777,((GCA_004016095.1__cloA__8844_t:0.009893029,(GCA_004016475.1__cloA__642_t:0.002953063,(GCA_004016155.1__cloA__3474_t:0.000000006,GCA_004016465.1__cloA__5739_t:0.004728237)0.948:0.008104252)0.928:0.021018720)1.000:0.136621709,(GCA_000222875.2_PerIpo_1.0__cloA__3796_t:0.042895881,GCA_000309355.1_NGansIn1.0__cloA__1668_t:0.076904015)0.966:0.043079288)0.996:0.100485461)0.688:0.027391514)0.914:0.049187964)0.998:0.070423850)0.000:0.000000005,GCA_000814955.1_MGU_1.0__cloA__KID83106.1:0.015697490)0.814:0.005104727)0.710:0.001552280)0.976:0.008037957)0.000:0.000000005)"

var example_tree_16s = "(((Natronorubrum_tibetense_91.284%:0.021736330,(Natrialba_magadii_91.107%:0.000000006,(Natrialba_hulunbeirensis_91.192%:0.003110632,Natrialba_chahannaoensis_91.131%:0.011836764)0.976:0.004594785)0.980:0.012378428)0.996:0.016690731,(Haloterrigena_daqingensis_91.278%:0.000677347,Natronorubrum_sediminis_91.210%:0.000000005)1.000:0.022977288)0.474:0.006371801,Haloterrigena_turkmenica_90.934%:0.017875381,((((Halostagnicola_larsenii_90.854%:0.005701808,Halostagnicola_kamekurae_90.325%:0.009259313)1.000:0.032958280,((Halovivax_asiaticus_90.860%:0.000000005,Halovivax_ruber_90.860%:0.002044338)1.000:0.028382257,(Natronococcus_occultus_90.903%:0.024715036,Natronococcus_amylolyticus_90.669%:0.017448501)0.988:0.015135714)0.642:0.010963602)0.989:0.013331345,(((Natronobacterium_gregoryi_91.419%:0.026082722,(Halobiforma_nitratireducens_91.174%:0.014409598,(Halobiforma_lacisalsi_91.162%:0.003512291,Halobiforma_haloterrestris_91.162%:0.000000005)0.992:0.015179992)0.992:0.013939089)0.988:0.013184376,(Halopiger_djelfimassiliensis_91.051%:0.021343110,(Halopiger_goleimassiliensis_91.650%:0.012217509,(Halopiger_thermotolerans_91.168%:0.006447690,(Halopiger_aswanensis_90.610%:0.005002965,Halopiger_xanaduensis_91.168%:0.004022460)0.754:0.003466166)0.998:0.017303265)0.985:0.016255190)0.360:0.006393959)0.865:0.005584472,(((Halorussus_salinus_90.496%:0.068965601,((Halobonum_tyrrellensis_91.452%:0.057997329,((Halalkalicoccus_jeotgali_91.808%:0.004999018,(Halalkalicoccus_tibetensis_91.949%:0.004441903,Halalkalicoccus_paucihalophilus_91.740%:0.001736208)0.760:0.003610205)1.000:0.040045406,Salinirubrum_litoreum_90.915%:0.046166961)0.647:0.011833579)0.931:0.011965786,((Halomicrobium_zhouii_91.057%:0.034324647,(Halapricum_salinum_90.631%:0.036226880,Salinirussus_salinus_90.502%:0.032674473)0.922:0.010219135)0.978:0.016648531,(Halanaeroarchaeum_sulfurireducens_90.792%:0.033874325,(Halarchaeum_grantii_90.441%:0.059267472,(Halobacterium_noricense_90.441%:0.005693888,(Halobacterium_salinarum_90.515%:0.011256581,Halobacterium_jilantaiense_90.792%:0.006278708)0.996:0.014882076)0.987:0.014384187)0.965:0.018031896)0.990:0.025534917)0.965:0.012115945)0.826:0.007508486)0.642:0.009825759,((Haloarchaeobius_iranensis_90.373%:0.065867442,(Natronoarchaeum_persicum_90.447%:0.008530936,Natronoarchaeum_philippinense_90.338%:0.013726985)1.000:0.051247353)0.988:0.022546770,(Halostella_limicola_LT12:0.036200855,Halostella_salina_94.643%:0.025542270)0.995:0.020830933)0.956:0.012465561)0.995:0.019397110,(Saliphagus_infecundisoli_91.272%:0.031745821,(Natribaculum_breve_91.578%:0.004365749,(Halovarius_luteus_92.265%:0.007727646,Natribaculum_longum_92.074%:0.001450510)0.889:0.003415284)0.999:0.021702366)0.980:0.013979131)0.983:0.012512033)0.781:0.008943496)0.969:0.011975021,((Natrinema_ejinorense_91.155%:0.021026219,Natrinema_soli_90.940%:0.021351721)0.971:0.011594437,(Natrinema_altunense_91.284%:0.006685533,(Natrinema_pellirubrum_90.946%:0.000000005,(Haloterrigena_thermotolerans_90.878%:0.002787654,Haloterrigena_saccharevitans_90.743%:0.008291312)0.564:0.002713223)0.993:0.011095497)0.345:0.004923783)0.950:0.009983374)0.582:0.004262338)"

var iTOL_salmonella_new = "(Salmonella_ref:0.0005653208,(((((((((((29:0.0006274265,28:0.0007453208)99.7/50:0.0001872059,37:0.0004051114)100/100:0.0004055372,(((((13:0.0003850937,((14:0.0005388715,1:0.0004283749)100/100:0.0001815541,(6:0.0003468217,4:0.0005114171)100/100:0.0002890789)100/97:0.0001969449)98.7/97:0.0001149961,(9:0.0006384992,12:0.0006390788)94.9/91:0.0002080736)100/97:0.0002177648,38:0.0007135468)34.6/15:0.0000929745,5:0.0003610535)98.9/17:0.0001180989,(36:0.0005414807,34:0.0003380281)100/100:0.0002368195)93.5/17:0.0000363963)98.2/99:0.0000768489,(30:0.0004280107,22:0.0005816245)100/100:0.0002010597)100/100:0.0003737930,40:0.0010285694)100/100:0.0053418441,std:0.0167555037)100/100:0.0668904823,26:0.0738599399)100/82:0.0098869688,(((((((3:0.0005401246,25:0.0005486585)100/100:0.0002666866,((33:0.0004782834,(8:0.0004132434,7:0.0005969512)57/90:0.0001744139)95.9/98:0.0001350816,23:0.0003641472)100/100:0.0002140909)79.4/88:0.0002092929,31:0.0008847506)100/100:0.0021082977,35:0.0025039773)100/100:0.0011909268,17:0.0032004843)100/100:0.0658806396,24:0.0674141280)35/73:0.0104112703,20:0.0761009025)100/82:0.0067733720)100/100:0.0114381701,32:0.0824106116)100/100:0.0109103689,(((((3.S15:0.0006963731,15:0.0003003925)100/100:0.0006785274,11:0.0011347243)100/100:0.0687406536,18:0.0700438215)24.9/70:0.0105937217,19:0.0753772478)100/100:0.0131072237,(27:0.0065209291,2:0.0080301479)100/100:0.1214701452)100/100:0.0104225062)100/100:0.0190285661,39:0.0863665980)100/100:0.1102126783,std_2.50071:0.0005149784)";

var fasttree = "(GCA_000591435.1_MR2010_11_27__cloA__EXU97507.1:0.000000005,GCA_000187425.1_MetAni_May2010__cloA__EFY97958.1:0.000000005,(GCA_000187425.2_MAA_2.0__cloA__EFY97958.1:0.000000005,((GCA_000426965.1_ASM42696v1__cloA__KJK79256.1:0.0,GCA_000426985.1_ASM42698v1__cloA__KJK95577.1:0.0):0.007659574,(GCA_000814965.1_MBR_1.0__cloA__KID68986.1:0.014154872,(((GCA_000814975.1_MAN_1.0__cloA__KID65154.1:0.000000005,GCA_000739145.1_Metarhizium_anisopliae__cloA__KFG79548.1:0.000000005)0.898:0.004364554,(GCA_000804445.1_MAM_1.0_for_version_1_of_the_Metarhizium_album_genome__cloA__KHN97497.1:0.141863344,(GCA_000731825.1_ASM73182v1__cloA__462_t:0.457086775,((GCA_000877375.1_EamaE4668v1__cloA__5878_t:0.128772626,(GCA_003012085.1_Trichoderma_brevicompactum_IBT40841_contigs__cloA__4902_t:0.290480210,((GCA_003184865.1_Asphom1__cloA__RAL15190.1:0.195190664,GCA_009176345.1__cloA__KAB8071277.1:0.147594683)1.000:0.152383335,(GCA_004154915.1__cloA__RYP10945.1:0.088765402,(GCA_009193565.1__cloA__KAE8351816.1:0.186047402,((GCA_002120305.1_HypCO275_v1.0__cloA__OTA81174.1:0.038407837,GCA_002120335.1_HypEC38_v3.0__cloA__OTA60878.1:0.026513308)1.000:0.128242424,(GCA_002120325.1_DalEC12_v.1.0__cloA__OTB14165.1:0.036637360,(GCA_000261445.1_ASM26144v1__cloA__13289_t:0.014555542,(GCA_001951055.1_D.eschs_IFB_TL01_1.0__cloA__1573_t:0.005334912,(GCA_000751375.2_UM_1400.v1__cloA__1917_t:0.000000005,GCA_000751375.1_UM_1400.v1__cloA__1960_t:0.001567539)0.764:0.002390105)0.826:0.004873583)0.986:0.027499482)1.000:0.161031540)0.984:0.053105635)0.804:0.014715348)0.812:0.045503958)1.000:0.266367392)0.994:0.145163759)0.986:0.083932777,((GCA_004016095.1__cloA__8844_t:0.009893029,(GCA_004016475.1__cloA__642_t:0.002953063,(GCA_004016155.1__cloA__3474_t:0.000000006,GCA_004016465.1__cloA__5739_t:0.004728237)0.948:0.008104252)0.928:0.021018720)1.000:0.136621709,(GCA_000222875.2_PerIpo_1.0__cloA__3796_t:0.042895881,GCA_000309355.1_NGansIn1.0__cloA__1668_t:0.076904015)0.966:0.043079288)0.996:0.100485461)0.688:0.027391514)0.914:0.049187964)0.998:0.070423850)0.000:0.000000005,GCA_000814955.1_MGU_1.0__cloA__KID83106.1:0.015697490)0.814:0.005104727)0.710:0.001552280)0.976:0.008037957)0.000:0.000000005)"

var text = "(9:0.3006384992,(12:0.23,13:0.23,14:0.53))"

var example_tree_text12 = "(((((((TASVd:0.06828169,CSVd:0.06828169)0.8170:0.05635267,CEVd:0.12463435)0.8290:0.06964112,(PSTVd:0.02617095,TCDVd:0.02617095)1.0000:0.16810452)0.6700:0.08751399,CLVd:0.28178947)0.8700:0.13005822,(HSVd:0.26704011,(CCCVd:0.20577326,CVdIV:0.20577326)0.6520:0.06126685)0.8790:0.14480757)0.8810:0.18306776,(((CbVd-2:0.08236826,CbVd-3:0.08236826)0.9300:0.10543001,CbVd-1:0.18779827)0.9970:0.29222981,(PBCVd:0.38569588,(CBLVd:0.30671661,(ASSVd:0.25961362,(CVd-OS:0.14517605,CVDIII:0.14517605)0.9870:0.11443757)0.5950:0.04710299)0.5660:0.07897927)0.7300:0.09433220)0.6860:0.11488736)0.9840:0.46199326,((CCHMVd:0.37098428,PLMVd:0.37098428)0.8850:0.20471288,(ELVd:0.37028264,ASBVd:0.37028264)0.8730:0.20541453)0.9840:0.48121154)"



var example_tree_text =
    `((EL1Vcd:0.8264,ASBV2d:0.3264,AS4BsaVd:0.037964)0.87360:0.205493,(ASBs8haVd:0.0343,(Aq1:0.132,(
        
        
        ((zzas:0.232,zz233:0.8230)0.1421:0.36769, zz2:0.370,zz3:0.820)0.121:0.6769
        
        
    )0.821:0.5169,Cq2:0.260)0.421:0.169)0.871230:0.2340541453)`

var example_tree_text =
    `((EL1Vcd:0.8264,ASBV2d:0.3264,AS4BsaVd:0.037964)0.87360:0.205493,(ASBs8haVd:0.0343,(Aq1:0.132,(((zzas:0.232)0.1421:0.36769)0.121:0.6769)0.821:0.5169,Cq2:0.260)0.421:0.169)0.871230:0.2340541453)`


// var configData = {
//     "Halostella_salina_94.643%": {
//         "identity_genus": {
//             "length": "0.9464",
//             "color": "#00FF99FF",
//             "label": "Halostella 0.9464"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00FF99FF",
//             "label": "1"
//         }
//     },
//     "Halostagnicola_larsenii_90.854%": {
//         "identity_genus": {
//             "length": "0.9085",
//             "color": "#00FFFFFF",
//             "label": "Halostagnicola 0.9085"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00FFFFFF",
//             "label": "3"
//         }
//     },
//     "Halalkalicoccus_tibetensis_91.949%": {
//         "identity_genus": {
//             "length": "0.9195",
//             "color": "#0033FFFF",
//             "label": "Halalkalicoccus 0.9195"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#0033FFFF",
//             "label": "2"
//         }
//     },
//     "Halobiforma_lacisalsi_91.162%": {
//         "identity_genus": {
//             "length": "0.9116",
//             "color": "#FFFF00FF",
//             "label": "Halobiforma 0.9116"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#FFFF00FF",
//             "label": "3"
//         }
//     },
//     "Salinirussus_salinus_90.502%": {
//         "identity_genus": {
//             "length": "0.905",
//             "color": "#66FF00FF",
//             "label": "Salinirussus 0.905"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#66FF00FF",
//             "label": "2"
//         }
//     },
//     "Halobiforma_haloterrestris_91.162%": {
//         "identity_genus": {
//             "length": "0.9116",
//             "color": "#FFFF00FF",
//             "label": "Halobiforma 0.9116"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#FFFF00FF",
//             "label": "1"
//         }
//     },
//     "Natrinema_pellirubrum_90.946%": {
//         "identity_genus": {
//             "length": "0.9095",
//             "color": "#00CCFFFF",
//             "label": "Natrinema 0.9095"
//         },
//         "flag": {
//             "shape": "circle",
//             "label": "-1"
//         },
//         "random": {
//             "color": "#00CCFFFF",
//             "label": "1"
//         }
//     },
//     "Halalkalicoccus_paucihalophilus_91.740%": {
//         "identity_genus": {
//             "length": "0.9174",
//             "color": "#0033FFFF",
//             "label": "Halalkalicoccus 0.9174"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#0033FFFF",
//             "label": "0"
//         }
//     },
//     "Natrinema_ejinorense_91.155%": {
//         "identity_genus": {
//             "length": "0.9116",
//             "color": "#00CCFFFF",
//             "label": "Natrinema 0.9116"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00CCFFFF",
//             "label": "2"
//         }
//     },
//     "Halobacterium_jilantaiense_90.792%": {
//         "identity_genus": {
//             "length": "0.9079",
//             "color": "#0000FFFF",
//             "label": "Halobacterium 0.9079"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#0000FFFF",
//             "label": "2"
//         }
//     },
//     "Halobonum_tyrrellensis_91.452%": {
//         "identity_genus": {
//             "length": "0.9145",
//             "color": "#FF00CCFF",
//             "label": "Halobonum 0.9145"
//         },
//         "flag": {
//             "shape": "triangle",
//             "label": "2"
//         },
//         "random": {
//             "color": "#FF00CCFF",
//             "label": "1"
//         }
//     },
//     "Halopiger_goleimassiliensis_91.650%": {
//         "identity_genus": {
//             "length": "0.9165",
//             "color": "#9900FFFF",
//             "label": "Halopiger 0.9165"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#9900FFFF",
//             "label": "4"
//         }
//     },
//     "Halopiger_aswanensis_90.610%": {
//         "identity_genus": {
//             "length": "0.9061",
//             "color": "#9900FFFF",
//             "label": "Halopiger 0.9061"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#9900FFFF",
//             "label": "4"
//         }
//     },
//     "Salinirubrum_litoreum_90.915%": {
//         "identity_genus": {
//             "length": "0.9092",
//             "color": "#FF3300FF",
//             "label": "Salinirubrum 0.9092"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#FF3300FF",
//             "label": "1"
//         }
//     },
//     "Halobacterium_noricense_90.441%": {
//         "identity_genus": {
//             "length": "0.9044",
//             "color": "#0000FFFF",
//             "label": "Halobacterium 0.9044"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#0000FFFF",
//             "label": "0"
//         }
//     },
//     "Halovivax_asiaticus_90.860%": {
//         "identity_genus": {
//             "length": "0.9086",
//             "color": "#99FF00FF",
//             "label": "Halovivax 0.9086"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#99FF00FF",
//             "label": "4"
//         }
//     },
//     "Natrialba_hulunbeirensis_91.192%": {
//         "identity_genus": {
//             "length": "0.9119",
//             "color": "#00FF33FF",
//             "label": "Natrialba 0.9119"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00FF33FF",
//             "label": "1"
//         }
//     },
//     "Natrinema_soli_90.940%": {
//         "identity_genus": {
//             "length": "0.9094",
//             "color": "#00CCFFFF",
//             "label": "Natrinema 0.9094"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00CCFFFF",
//             "label": "1"
//         }
//     },
//     "Halopiger_xanaduensis_91.168%": {
//         "identity_genus": {
//             "length": "0.9117",
//             "color": "#9900FFFF",
//             "label": "Halopiger 0.9117"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#9900FFFF",
//             "label": "0"
//         }
//     },
//     "Natrialba_chahannaoensis_91.131%": {
//         "identity_genus": {
//             "length": "0.9113",
//             "color": "#00FF33FF",
//             "label": "Natrialba 0.9113"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00FF33FF",
//             "label": "2"
//         }
//     },
//     "Natronobacterium_gregoryi_91.419%": {
//         "identity_genus": {
//             "length": "0.9142",
//             "color": "#00FF66FF",
//             "label": "Natronobacterium 0.9142"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00FF66FF",
//             "label": "0"
//         }
//     },
//     "Haloarchaeobius_iranensis_90.373%": {
//         "identity_genus": {
//             "length": "0.9037",
//             "color": "#FF6600FF",
//             "label": "Haloarchaeobius 0.9037"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#FF6600FF",
//             "label": "1"
//         }
//     },
//     "Haloterrigena_saccharevitans_90.743%": {
//         "identity_genus": {
//             "length": "0.9074",
//             "color": "#00FFCCFF",
//             "label": "Haloterrigena 0.9074"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00FFCCFF",
//             "label": "3"
//         }
//     },
//     "Halostagnicola_kamekurae_90.325%": {
//         "identity_genus": {
//             "length": "0.9033",
//             "color": "#00FFFFFF",
//             "label": "Halostagnicola 0.9033"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00FFFFFF",
//             "label": "3"
//         }
//     },
//     "Haloterrigena_turkmenica_90.934%": {
//         "identity_genus": {
//             "length": "0.9093",
//             "color": "#00FFCCFF",
//             "label": "Haloterrigena 0.9093"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00FFCCFF",
//             "label": "3"
//         }
//     },
//     "Natronococcus_amylolyticus_90.669%": {
//         "identity_genus": {
//             "length": "0.9067",
//             "color": "#FF9900FF",
//             "label": "Natronococcus 0.9067"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#FF9900FF",
//             "label": "4"
//         }
//     },
//     "Halostella_limicola_LT12": {
//         "flag": {
//             "shape": "square",
//             "label": "1"
//         },
//         "random": {
//             "color": "#00FF99FF",
//             "label": "3"
//         }
//     },
//     "Natribaculum_breve_91.578%": {
//         "identity_genus": {
//             "length": "0.9158",
//             "color": "#0099FFFF",
//             "label": "Natribaculum 0.9158"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#0099FFFF",
//             "label": "2"
//         }
//     },
//     "Natribaculum_longum_92.074%": {
//         "identity_genus": {
//             "length": "0.9207",
//             "color": "#0099FFFF",
//             "label": "Natribaculum 0.9207"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#0099FFFF",
//             "label": "3"
//         }
//     },
//     "Natrialba_magadii_91.107%": {
//         "identity_genus": {
//             "length": "0.9111",
//             "color": "#00FF33FF",
//             "label": "Natrialba 0.9111"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00FF33FF",
//             "label": "0"
//         }
//     },
//     "Halopiger_thermotolerans_91.168%": {
//         "identity_genus": {
//             "length": "0.9117",
//             "color": "#9900FFFF",
//             "label": "Halopiger 0.9117"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#9900FFFF",
//             "label": "2"
//         }
//     },
//     "Halomicrobium_zhouii_91.057%": {
//         "identity_genus": {
//             "length": "0.9106",
//             "color": "#6600FFFF",
//             "label": "Halomicrobium 0.9106"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#6600FFFF",
//             "label": "3"
//         }
//     },
//     "Natronococcus_occultus_90.903%": {
//         "identity_genus": {
//             "length": "0.909",
//             "color": "#FF9900FF",
//             "label": "Natronococcus 0.909"
//         },
//         "flag": {
//             "shape": "circle",
//             "label": "-1"
//         },
//         "random": {
//             "color": "#FF9900FF",
//             "label": "0"
//         }
//     },
//     "Natronoarchaeum_persicum_90.447%": {
//         "identity_genus": {
//             "length": "0.9045",
//             "color": "#0066FFFF",
//             "label": "Natronoarchaeum 0.9045"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#0066FFFF",
//             "label": "3"
//         }
//     },
//     "Natronorubrum_sediminis_91.210%": {
//         "identity_genus": {
//             "length": "0.9121",
//             "color": "#CCFF00FF",
//             "label": "Natronorubrum 0.9121"
//         },
//         "flag": {
//             "shape": "circle",
//             "label": "-1"
//         },
//         "random": {
//             "color": "#CCFF00FF",
//             "label": "4"
//         }
//     },
//     "Halobiforma_nitratireducens_91.174%": {
//         "identity_genus": {
//             "length": "0.9117",
//             "color": "#FFFF00FF",
//             "label": "Halobiforma 0.9117"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#FFFF00FF",
//             "label": "2"
//         }
//     },
//     "Saliphagus_infecundisoli_91.272%": {
//         "identity_genus": {
//             "length": "0.9127",
//             "color": "#CC00FFFF",
//             "label": "Saliphagus 0.9127"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#CC00FFFF",
//             "label": "2"
//         }
//     },
//     "Natronoarchaeum_philippinense_90.338%": {
//         "identity_genus": {
//             "length": "0.9034",
//             "color": "#0066FFFF",
//             "label": "Natronoarchaeum 0.9034"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#0066FFFF",
//             "label": "1"
//         }
//     },
//     "Halovarius_luteus_92.265%": {
//         "identity_genus": {
//             "length": "0.9227",
//             "color": "#FF00FFFF",
//             "label": "Halovarius 0.9227"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#FF00FFFF",
//             "label": "3"
//         }
//     },
//     "Halanaeroarchaeum_sulfurireducens_90.792%": {
//         "identity_genus": {
//             "length": "0.9079",
//             "color": "#00FF00FF",
//             "label": "Halanaeroarchaeum 0.9079"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00FF00FF",
//             "label": "4"
//         }
//     },
//     "Haloterrigena_thermotolerans_90.878%": {
//         "identity_genus": {
//             "length": "0.9088",
//             "color": "#00FFCCFF",
//             "label": "Haloterrigena 0.9088"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00FFCCFF",
//             "label": "1"
//         }
//     },
//     "Halorussus_salinus_90.496%": {
//         "identity_genus": {
//             "length": "0.905",
//             "color": "#33FF00FF",
//             "label": "Halorussus 0.905"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#33FF00FF",
//             "label": "4"
//         }
//     },
//     "Halopiger_djelfimassiliensis_91.051%": {
//         "identity_genus": {
//             "length": "0.9105",
//             "color": "#9900FFFF",
//             "label": "Halopiger 0.9105"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#9900FFFF",
//             "label": "1"
//         }
//     },
//     "Halovivax_ruber_90.860%": {
//         "identity_genus": {
//             "length": "0.9086",
//             "color": "#99FF00FF",
//             "label": "Halovivax 0.9086"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#99FF00FF",
//             "label": "1"
//         }
//     },
//     "Halalkalicoccus_jeotgali_91.808%": {
//         "identity_genus": {
//             "length": "0.9181",
//             "color": "#0033FFFF",
//             "label": "Halalkalicoccus 0.9181"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#0033FFFF",
//             "label": "0"
//         }
//     },
//     "Natronorubrum_tibetense_91.284%": {
//         "identity_genus": {
//             "length": "0.9128",
//             "color": "#CCFF00FF",
//             "label": "Natronorubrum 0.9128"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#CCFF00FF",
//             "label": "0"
//         }
//     },
//     "Halobacterium_salinarum_90.515%": {
//         "identity_genus": {
//             "length": "0.9052",
//             "color": "#0000FFFF",
//             "label": "Halobacterium 0.9052"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#0000FFFF",
//             "label": "0"
//         }
//     },
//     "Haloterrigena_daqingensis_91.278%": {
//         "identity_genus": {
//             "length": "0.9128",
//             "color": "#00FFCCFF",
//             "label": "Haloterrigena 0.9128"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00FFCCFF",
//             "label": "2"
//         }
//     },
//     "Halapricum_salinum_90.631%": {
//         "identity_genus": {
//             "length": "0.9063",
//             "color": "#FFCC00FF",
//             "label": "Halapricum 0.9063"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#FFCC00FF",
//             "label": "0"
//         }
//     },
//     "Halarchaeum_grantii_90.441%": {
//         "identity_genus": {
//             "length": "0.9044",
//             "color": "#3300FFFF",
//             "label": "Halarchaeum 0.9044"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#3300FFFF",
//             "label": "0"
//         }
//     },
//     "Natrinema_altunense_91.284%": {
//         "identity_genus": {
//             "length": "0.9128",
//             "color": "#00CCFFFF",
//             "label": "Natrinema 0.9128"
//         },
//         "flag": {
//             "shape": "rhombus",
//             "label": "0"
//         },
//         "random": {
//             "color": "#00CCFFFF",
//             "label": "3"
//         }
//     }
// }

// var labelConfig = {
//     "identity_genus": {
//         "position": 3,
//         "length": [0, 1]
//     },
//     "flag": {
//         "position": 2,
//     },
//     "random": {
//         "position": 1,
//     }
// }


var configData = {
    "Halovivax_asiaticus_90.860%": {
        "identity_genus": {
            "length": "0.9086",
            "color": "#FFFF00FF",
            "label": "Halovivax 0.9086"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#616161",
            "label": "4"
        }
    },
    "Haloarchaeobius_iranensis_90.373%": {
        "identity_genus": {
            "length": "0.9037",
            "color": "#00FF00FF",
            "label": "Haloarchaeobius 0.9037"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#BBBBBB",
            "label": "1"
        }
    },
    "Halobiforma_lacisalsi_91.162%": {
        "identity_genus": {
            "length": "0.9116",
            "color": "#0066FFFF",
            "label": "Halobiforma 0.9116"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#7F7F7F",
            "label": "3"
        }
    },
    "Natronococcus_occultus_90.903%": {
        "identity_genus": {
            "length": "0.909",
            "color": "#0033FFFF",
            "label": "Natronococcus 0.909"
        },
        "flag": {
            "shape": "circle",
            "label": "-1"
        },
        "random": {
            "color": "#D9D9D9",
            "label": "0"
        }
    },
    "Natronococcus_amylolyticus_90.669%": {
        "identity_genus": {
            "length": "0.9067",
            "color": "#0033FFFF",
            "label": "Natronococcus 0.9067"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#616161",
            "label": "4"
        }
    },
    "Natribaculum_longum_92.074%": {
        "identity_genus": {
            "length": "0.9207",
            "color": "#00FF33FF",
            "label": "Natribaculum 0.9207"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#7F7F7F",
            "label": "3"
        }
    },
    "Natrialba_hulunbeirensis_91.192%": {
        "identity_genus": {
            "length": "0.9119",
            "color": "#FF00CCFF",
            "label": "Natrialba 0.9119"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#BBBBBB",
            "label": "1"
        }
    },
    "Halarchaeum_grantii_90.441%": {
        "identity_genus": {
            "length": "0.9044",
            "color": "#0099FFFF",
            "label": "Halarchaeum 0.9044"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#D9D9D9",
            "label": "0"
        }
    },
    "Halovarius_luteus_92.265%": {
        "identity_genus": {
            "length": "0.9227",
            "color": "#6600FFFF",
            "label": "Halovarius 0.9227"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#7F7F7F",
            "label": "3"
        }
    },
    "Salinirussus_salinus_90.502%": {
        "identity_genus": {
            "length": "0.905",
            "color": "#00FF66FF",
            "label": "Salinirussus 0.905"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#9D9D9D",
            "label": "2"
        }
    },
    "Halomicrobium_zhouii_91.057%": {
        "identity_genus": {
            "length": "0.9106",
            "color": "#CCFF00FF",
            "label": "Halomicrobium 0.9106"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#7F7F7F",
            "label": "3"
        }
    },
    "Halopiger_xanaduensis_91.168%": {
        "identity_genus": {
            "length": "0.9117",
            "color": "#FFCC00FF",
            "label": "Halopiger 0.9117"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#D9D9D9",
            "label": "0"
        }
    },
    "Halopiger_aswanensis_90.610%": {
        "identity_genus": {
            "length": "0.9061",
            "color": "#FFCC00FF",
            "label": "Halopiger 0.9061"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#616161",
            "label": "4"
        }
    },
    "Halobacterium_jilantaiense_90.792%": {
        "identity_genus": {
            "length": "0.9079",
            "color": "#33FF00FF",
            "label": "Halobacterium 0.9079"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#9D9D9D",
            "label": "2"
        }
    },
    "Halostella_salina_94.643%": {
        "identity_genus": {
            "length": "0.9464",
            "color": "#9900FFFF",
            "label": "Halostella 0.9464"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#BBBBBB",
            "label": "1"
        }
    },
    "Halostagnicola_larsenii_90.854%": {
        "identity_genus": {
            "length": "0.9085",
            "color": "#FF00FFFF",
            "label": "Halostagnicola 0.9085"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#7F7F7F",
            "label": "3"
        }
    },
    "Halobiforma_nitratireducens_91.174%": {
        "identity_genus": {
            "length": "0.9117",
            "color": "#0066FFFF",
            "label": "Halobiforma 0.9117"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#9D9D9D",
            "label": "2"
        }
    },
    "Haloterrigena_saccharevitans_90.743%": {
        "identity_genus": {
            "length": "0.9074",
            "color": "#FF3300FF",
            "label": "Haloterrigena 0.9074"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#7F7F7F",
            "label": "3"
        }
    },
    "Natrinema_ejinorense_91.155%": {
        "identity_genus": {
            "length": "0.9116",
            "color": "#3300FFFF",
            "label": "Natrinema 0.9116"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#9D9D9D",
            "label": "2"
        }
    },
    "Halapricum_salinum_90.631%": {
        "identity_genus": {
            "length": "0.9063",
            "color": "#0000FFFF",
            "label": "Halapricum 0.9063"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#D9D9D9",
            "label": "0"
        }
    },
    "Saliphagus_infecundisoli_91.272%": {
        "identity_genus": {
            "length": "0.9127",
            "color": "#CC00FFFF",
            "label": "Saliphagus 0.9127"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#9D9D9D",
            "label": "2"
        }
    },
    "Natronoarchaeum_persicum_90.447%": {
        "identity_genus": {
            "length": "0.9045",
            "color": "#FF6600FF",
            "label": "Natronoarchaeum 0.9045"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#7F7F7F",
            "label": "3"
        }
    },
    "Natronorubrum_sediminis_91.210%": {
        "identity_genus": {
            "length": "0.9121",
            "color": "#00FFFFFF",
            "label": "Natronorubrum 0.9121"
        },
        "flag": {
            "shape": "circle",
            "label": "-1"
        },
        "random": {
            "color": "#616161",
            "label": "4"
        }
    },
    "Halanaeroarchaeum_sulfurireducens_90.792%": {
        "identity_genus": {
            "length": "0.9079",
            "color": "#FF9900FF",
            "label": "Halanaeroarchaeum 0.9079"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#616161",
            "label": "4"
        }
    },
    "Natrinema_altunense_91.284%": {
        "identity_genus": {
            "length": "0.9128",
            "color": "#3300FFFF",
            "label": "Natrinema 0.9128"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#7F7F7F",
            "label": "3"
        }
    },
    "Halalkalicoccus_tibetensis_91.949%": {
        "identity_genus": {
            "length": "0.9195",
            "color": "#66FF00FF",
            "label": "Halalkalicoccus 0.9195"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#9D9D9D",
            "label": "2"
        }
    },
    "Halalkalicoccus_paucihalophilus_91.740%": {
        "identity_genus": {
            "length": "0.9174",
            "color": "#66FF00FF",
            "label": "Halalkalicoccus 0.9174"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#D9D9D9",
            "label": "0"
        }
    },
    "Halobacterium_noricense_90.441%": {
        "identity_genus": {
            "length": "0.9044",
            "color": "#33FF00FF",
            "label": "Halobacterium 0.9044"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#D9D9D9",
            "label": "0"
        }
    },
    "Halostagnicola_kamekurae_90.325%": {
        "identity_genus": {
            "length": "0.9033",
            "color": "#FF00FFFF",
            "label": "Halostagnicola 0.9033"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#7F7F7F",
            "label": "3"
        }
    },
    "Natronorubrum_tibetense_91.284%": {
        "identity_genus": {
            "length": "0.9128",
            "color": "#00FFFFFF",
            "label": "Natronorubrum 0.9128"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#D9D9D9",
            "label": "0"
        }
    },
    "Halovivax_ruber_90.860%": {
        "identity_genus": {
            "length": "0.9086",
            "color": "#FFFF00FF",
            "label": "Halovivax 0.9086"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#BBBBBB",
            "label": "1"
        }
    },
    "Halorussus_salinus_90.496%": {
        "identity_genus": {
            "length": "0.905",
            "color": "#99FF00FF",
            "label": "Halorussus 0.905"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#616161",
            "label": "4"
        }
    },
    "Haloterrigena_daqingensis_91.278%": {
        "identity_genus": {
            "length": "0.9128",
            "color": "#FF3300FF",
            "label": "Haloterrigena 0.9128"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#9D9D9D",
            "label": "2"
        }
    },
    "Natronoarchaeum_philippinense_90.338%": {
        "identity_genus": {
            "length": "0.9034",
            "color": "#FF6600FF",
            "label": "Natronoarchaeum 0.9034"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#BBBBBB",
            "label": "1"
        }
    },
    "Natribaculum_breve_91.578%": {
        "identity_genus": {
            "length": "0.9158",
            "color": "#00FF33FF",
            "label": "Natribaculum 0.9158"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#9D9D9D",
            "label": "2"
        }
    },
    "Halobacterium_salinarum_90.515%": {
        "identity_genus": {
            "length": "0.9052",
            "color": "#33FF00FF",
            "label": "Halobacterium 0.9052"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#D9D9D9",
            "label": "0"
        }
    },
    "Haloterrigena_thermotolerans_90.878%": {
        "identity_genus": {
            "length": "0.9088",
            "color": "#FF3300FF",
            "label": "Haloterrigena 0.9088"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#BBBBBB",
            "label": "1"
        }
    },
    "Halopiger_djelfimassiliensis_91.051%": {
        "identity_genus": {
            "length": "0.9105",
            "color": "#FFCC00FF",
            "label": "Halopiger 0.9105"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#BBBBBB",
            "label": "1"
        }
    },
    "Natrialba_magadii_91.107%": {
        "identity_genus": {
            "length": "0.9111",
            "color": "#FF00CCFF",
            "label": "Natrialba 0.9111"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#D9D9D9",
            "label": "0"
        }
    },
    "Halostella_limicola_LT12": {
        "flag": {
            "shape": "square",
            "label": "1"
        },
        "random": {
            "color": "#7F7F7F",
            "label": "3"
        }
    },
    "Natronobacterium_gregoryi_91.419%": {
        "identity_genus": {
            "length": "0.9142",
            "color": "#00FFCCFF",
            "label": "Natronobacterium 0.9142"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#D9D9D9",
            "label": "0"
        }
    },
    "Halobiforma_haloterrestris_91.162%": {
        "identity_genus": {
            "length": "0.9116",
            "color": "#0066FFFF",
            "label": "Halobiforma 0.9116"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#BBBBBB",
            "label": "1"
        }
    },
    "Natrialba_chahannaoensis_91.131%": {
        "identity_genus": {
            "length": "0.9113",
            "color": "#FF00CCFF",
            "label": "Natrialba 0.9113"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#9D9D9D",
            "label": "2"
        }
    },
    "Halalkalicoccus_jeotgali_91.808%": {
        "identity_genus": {
            "length": "0.9181",
            "color": "#66FF00FF",
            "label": "Halalkalicoccus 0.9181"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#D9D9D9",
            "label": "0"
        }
    },
    "Haloterrigena_turkmenica_90.934%": {
        "identity_genus": {
            "length": "0.9093",
            "color": "#FF3300FF",
            "label": "Haloterrigena 0.9093"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#7F7F7F",
            "label": "3"
        }
    },
    "Natrinema_soli_90.940%": {
        "identity_genus": {
            "length": "0.9094",
            "color": "#3300FFFF",
            "label": "Natrinema 0.9094"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#BBBBBB",
            "label": "1"
        }
    },
    "Halopiger_thermotolerans_91.168%": {
        "identity_genus": {
            "length": "0.9117",
            "color": "#FFCC00FF",
            "label": "Halopiger 0.9117"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#9D9D9D",
            "label": "2"
        }
    },
    "Halobonum_tyrrellensis_91.452%": {
        "identity_genus": {
            "length": "0.9145",
            "color": "#00FF99FF",
            "label": "Halobonum 0.9145"
        },
        "flag": {
            "shape": "triangle",
            "label": "2"
        },
        "random": {
            "color": "#BBBBBB",
            "label": "1"
        }
    },
    "Natrinema_pellirubrum_90.946%": {
        "identity_genus": {
            "length": "0.9095",
            "color": "#3300FFFF",
            "label": "Natrinema 0.9095"
        },
        "flag": {
            "shape": "circle",
            "label": "-1"
        },
        "random": {
            "color": "#BBBBBB",
            "label": "1"
        }
    },
    "Halopiger_goleimassiliensis_91.650%": {
        "identity_genus": {
            "length": "0.9165",
            "color": "#FFCC00FF",
            "label": "Halopiger 0.9165"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#616161",
            "label": "4"
        }
    },
    "Salinirubrum_litoreum_90.915%": {
        "identity_genus": {
            "length": "0.9092",
            "color": "#00CCFFFF",
            "label": "Salinirubrum 0.9092"
        },
        "flag": {
            "shape": "rhombus",
            "label": "0"
        },
        "random": {
            "color": "#BBBBBB",
            "label": "1"
        }
    }
}



let labelConfig = {
    "identity_genus": {
        "position": 1,
        "length": [0, 1],
        "legend": {
            "color": {
                "#66FF00FF": "Halalkalicoccus",
                "#FF9900FF": "Halanaeroarchaeum",
                "#0000FFFF": "Halapricum",
                "#0099FFFF": "Halarchaeum",
                "#00FF00FF": "Haloarchaeobius",
                "#33FF00FF": "Halobacterium",
                "#0066FFFF": "Halobiforma",
                "#00FF99FF": "Halobonum",
                "#CCFF00FF": "Halomicrobium",
                "#FFCC00FF": "Halopiger",
                "#99FF00FF": "Halorussus",
                "#FF00FFFF": "Halostagnicola",
                "#9900FFFF": "Halostella",
                "#FF3300FF": "Haloterrigena",
                "#6600FFFF": "Halovarius",
                "#FFFF00FF": "Halovivax",
                "#FF00CCFF": "Natrialba",
                "#00FF33FF": "Natribaculum",
                "#3300FFFF": "Natrinema",
                "#FF6600FF": "Natronoarchaeum",
                "#00FFCCFF": "Natronobacterium",
                "#0033FFFF": "Natronococcus",
                "#00FFFFFF": "Natronorubrum",
                "#00CCFFFF": "Salinirubrum",
                "#00FF66FF": "Salinirussus",
                "#CC00FFFF": "Saliphagus"
            }
        }
    },
    "flag": {
        "position": 2,
        "legend": {
            "shape": {
                "circle": "-1",
                "rhombus": "0",
                "square": "1",
                "triangle": "2"
            }
        }
    },
    "random": {
        "position": 3,
        "legend": {
            "color": {
                "#D9D9D9": "0",
                "#BBBBBB": "1",
                "#9D9D9D": "2",
                "#7F7F7F": "3",
                "#616161": "4"
            }
        }
    }
}

